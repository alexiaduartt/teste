// app/(drawer)/details/[id].tsx
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { AGROSYS_DATA } from '@/data/agrosys-data';
import BottomNavButton from '@/components/BottomNavButton';

const Header = ({ title }: { title: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  const navigation = useNavigation<any>();

  return (
    <View
      style={[styles.header, { backgroundColor: themeColors.primary }]}
    >
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons
          name="chevron-back"
          size={30}
          color={themeColors.headerText}
        />
      </TouchableOpacity>
      <Text
        style={[
          styles.headerTitle,
          { color: themeColors.headerText },
        ]}
      >
        AGROSYS
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons
          name="menu"
          size={30}
          color={themeColors.headerText}
        />
      </TouchableOpacity>
    </View>
  );
};

const DetailField = ({ label, value }: { label: string; value: string }) => {
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];
  return (
    <View style={styles.detailField}>
      <Text
        style={[
          styles.detailLabel,
          { color: themeColors.detailLabel },
        ]}
      >
        {label}:
      </Text>
      <Text
        style={[
          styles.detailValue,
          { color: themeColors.detailLabel },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

function getEntityData(id: string, type: string) {
  let list: any[] = [];
  if (type === 'Produto') list = AGROSYS_DATA.products;
  else if (type === 'Insumo') list = AGROSYS_DATA.inputs;
  else if (type === 'UAP') list = AGROSYS_DATA.uaps;

  return list.find((item) => String(item.id) === String(id));
}

const FIELD_MAP: { [key: string]: string[] } = {
  Produto: [
    'name',
    'category',
    'price',
    'status',
    'quantity',
    'supplier',
    'storage',
    'validity',
    'description',
  ],
  Insumo: [
    'name',
    'type',
    'quantity',
    'unit',
    'supplier',
    'validity',
    'notes',
  ],
  UAP: [
    'name',
    'area',
    'responsible',
    'location',
    'cultivation',
    'notes',
  ],
};

const LABEL_TRANSLATION: { [key: string]: string } = {
  name: 'NOME',
  category: 'CATEGORIA',
  price: 'PREÇO UNITÁRIO',
  status: 'STATUS',
  quantity: 'QUANTIDADE',
  supplier: 'FORNECEDOR',
  storage: 'LOCAL DE ARMAZENAMENTO',
  validity: 'DATA DE VALIDADE',
  description: 'DESCRIÇÃO',
  type: 'TIPO',
  unit: 'UNIDADE',
  notes: 'OBSERVAÇÕES',
  area: 'ÁREA (HECTARES)',
  responsible: 'RESPONSÁVEL',
  location: 'LOCALIZAÇÃO',
  cultivation: 'TIPO DE CULTIVO',
};

export default function DetailsScreen() {
  const { id, type } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const themeColors = Colors[colorScheme];

  const entityId = Array.isArray(id) ? id[0] : (id as string);
  const entityType = (Array.isArray(type) ? type[0] : type || 'Item') as string;

  const itemData = entityId ? getEntityData(entityId, entityType) : null;

  const title = itemData ? `Detalhes do ${entityType}` : 'Item não encontrado';
  const subtitle = itemData
    ? `Controle e Acompanhamento dos ${entityType}s`
    : 'Verifique o ID informado.';

  const detailsToRender =
    itemData && FIELD_MAP[entityType]
      ? FIELD_MAP[entityType]
          .filter((key) => Object.prototype.hasOwnProperty.call(itemData, key))
          .map((key) => ({
            label: LABEL_TRANSLATION[key] || key.toUpperCase(),
            value: String((itemData as any)[key] ?? ''),
          }))
      : [];

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: themeColors.primary }]}
    >
      <Header title={title} />
      <View
        style={[
          styles.container,
          { backgroundColor: themeColors.background },
        ]}
      >
        <Text
          style={[
            styles.pageTitle,
            { color: themeColors.primary },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.pageSubtitle,
            { color: themeColors.subtleText },
          ]}
        >
          {subtitle}
        </Text>

        <ScrollView
          style={styles.detailsContainer}
          contentContainerStyle={styles.detailsContent}
        >
          <View
            style={[
              styles.detailsGroup,
              { backgroundColor: themeColors.detailBackground },
            ]}
          >
            {itemData ? (
              detailsToRender.map((detail, index) => (
                <DetailField
                  key={index}
                  label={detail.label}
                  value={detail.value}
                />
              ))
            ) : (
              <Text style={{ color: themeColors.detailLabel }}>
                {`${entityType} com ID ${entityId} não encontrado.`}
              </Text>
            )}
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </View>

      <BottomNavButton
        title={`+ Registrar ${entityType}`}
        onPress={() => router.back()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    flex: 1,
  },
  detailsContent: {
    paddingBottom: 40,
  },
  detailsGroup: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
  },
  detailField: {
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
});