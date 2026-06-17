import { useCallback, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getShopProfile } from "@/data/barberProfileMock";
import {
  getVariantById,
  getVariantsForCategory,
  isCategorySupported,
  type ServiceGender,
  type ServiceVariant,
} from "@/data/serviceVariantMock";
import { useBookingDraftStore } from "@/store/bookingDraftStore";
import type { RootStackParamList } from "@/navigation/types";

export interface UseServiceVariantScreenResult {
  categoryName: string;
  isSupported: boolean;
  activeGender: ServiceGender;
  variants: readonly ServiceVariant[];
  selectedVariantId: string;
  estimateCents: number | null;
  onGoBack: () => void;
  onSelectGender: (gender: ServiceGender) => void;
  onSelectVariant: (variantId: string) => void;
  onApplySelection: () => void;
}

export function useServiceVariantScreen(
  shopId: string,
  categoryId: string,
): UseServiceVariantScreenResult {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedVariants = useBookingDraftStore(
    (s) => s.draft?.selectedVariants ?? {},
  );
  const setSelectedVariant = useBookingDraftStore((s) => s.setSelectedVariant);

  const shop = useMemo(() => getShopProfile(shopId), [shopId]);
  const category = useMemo(
    () => shop.serviceCategories.find((item) => item.id === categoryId),
    [shop.serviceCategories, categoryId],
  );
  const isSupported = isCategorySupported(categoryId);

  const existingVariantId = selectedVariants[categoryId];
  const existingVariant =
    existingVariantId !== undefined
      ? getVariantById(existingVariantId)
      : undefined;

  const [activeGender, setActiveGender] = useState<ServiceGender>(
    () => existingVariant?.gender ?? "man",
  );

  const variants = useMemo(
    () => getVariantsForCategory(categoryId, activeGender),
    [categoryId, activeGender],
  );

  const [selectedVariantId, setSelectedVariantId] = useState(() => {
    const initialVariants = getVariantsForCategory(
      categoryId,
      existingVariant?.gender ?? "man",
    );

    if (
      existingVariant !== undefined &&
      initialVariants.some((variant) => variant.id === existingVariant.id)
    ) {
      return existingVariant.id;
    }

    return initialVariants[0]?.id ?? "";
  });

  const onSelectGender = useCallback(
    (gender: ServiceGender): void => {
      setActiveGender(gender);
      const genderVariants = getVariantsForCategory(categoryId, gender);
      setSelectedVariantId(genderVariants[0]?.id ?? "");
    },
    [categoryId],
  );

  const onSelectVariant = useCallback((variantId: string): void => {
    setSelectedVariantId(variantId);
  }, []);

  const onGoBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onApplySelection = useCallback((): void => {
    if (selectedVariantId === "") {
      return;
    }

    setSelectedVariant(categoryId, selectedVariantId);
    navigation.goBack();
  }, [categoryId, navigation, selectedVariantId, setSelectedVariant]);

  const selectedVariant = getVariantById(selectedVariantId);
  const estimateCents = selectedVariant?.priceCents ?? null;

  return {
    categoryName: category?.name ?? "Service",
    isSupported,
    activeGender,
    variants,
    selectedVariantId,
    estimateCents,
    onGoBack,
    onSelectGender,
    onSelectVariant,
    onApplySelection,
  };
}
