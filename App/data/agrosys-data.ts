// App/constants/data/agrosys-data.ts

export const AGROSYS_DATA = {
  products: [
    { 
      id: 'prod-123', 
      name: 'Adubo Premium', 
      category: 'Químicos', 
      price: 'R$ 50,00/kg', 
      status: 'Em Estoque',
      quantity: '1000 kg',
      supplier: 'AgroQuímica BR', 
      storage: 'Galpão A',
      validity: '12/12/2025',
      description: 'Fertilizante de alta performance para soja, rico em NPK.'
    },
    { 
      id: 'prod-456', 
      name: 'Semente de Soja', 
      category: 'Sementes', 
      price: 'R$ 150,00/saca', 
      status: 'Aguardando Compra',
      quantity: '200 sacas',
      supplier: 'Sementes Elite', 
      storage: 'Galpão B',
      validity: '01/06/2026',
      description: 'Semente híbrida com alta resistência a pragas.'
    },
  ],
  inputs: [
    { 
      id: 'ins-101', 
      name: 'Herbicida Total', 
      type: 'Defensivo', 
      quantity: '100 Litros', 
      unit: 'Litro',
      supplier: 'Farmacia Agrícola', 
      validity: '05/08/2025',
      notes: 'Produto de uso restrito, deve ser aplicado com EPI completo.'
    },
    { 
      id: 'ins-102', 
      name: 'Adubo Foliar', 
      type: 'Orgânico', 
      quantity: '200 Kg', 
      unit: 'Kg',
      supplier: 'Orgânicos Max', 
      validity: '10/10/2026',
      notes: 'Estimula o crescimento e floração de culturas sensíveis.'
    },
  ],
  uaps: [
    { 
      id: 'uap-201', 
      name: 'Fazenda Sol Nascente', 
      area: '250 Hectares', 
      responsible: 'Maria Conceição', 
      location: 'Latitude: -10.00, Longitude: -40.00',
      cultivation: 'Algodão',
      notes: 'Solo com boa drenagem, alto índice de PH.'
    },
    { 
      id: 'uap-202', 
      name: 'Sítio Verde Vivo', 
      area: '50 Hectares', 
      responsible: 'Carlos Almeida', 
      location: 'Próximo ao Rio Seco',
      cultivation: 'Milho',
      notes: 'Propriedade familiar, foco na produção orgânica.'
    },
  ],
};