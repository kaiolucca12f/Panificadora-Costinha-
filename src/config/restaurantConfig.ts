import { RestaurantConfig, MenuItem, MenuCategory } from '../types';

/**
 * =====================================================================
 * SISTEMA CENTRAL DE PERSONALIZAÇÃO DO RESTAURANTE / PADARIA
 * =====================================================================
 * Para personalizar este site para qualquer restaurante, hamburgueria,
 * pizzaria ou cafeteria, basta editar as informações deste arquivo!
 * 
 * Todas as seções do site (Hero, Cardápio, WhatsApp, Sobre, Horários,
 * Instagram e Rodapé) são alimentadas dinamicamente a partir daqui.
 * =====================================================================
 */

export const panificadoraCostinhaConfig: RestaurantConfig = {
  id: 'costinha',
  name: 'Panificadora Costinha',
  tagline: 'Padaria Artesanal, Cafeteria & Confeitaria Fina',
  shortDescription: 'Desde cedo com o cheiro acolhedor do pão quente, cafés especiais, salgados finos e doces artesanais feitos com carinho no coração de Santana.',
  foundingYear: 1994,
  storyTitle: 'Tradição, paixão pelo pão artesanal e carinho com a nossa comunidade',
  storyText: [
    'A Panificadora Costinha nasceu do sonho de levar à mesa dos santanenses o verdadeiro sabor do pão fresco, crocante por fora e macio por dentro, preparado diariamente nas primeiras horas da madrugada.',
    'Localizada estrategicamente no centro de Santana, na Praça da Bandeira, somos ponto de encontro de famílias, trabalhadores e amantes de um bom café passado na hora acompanhado de quitutes tradicionais e receitas exclusivas.',
    'Hoje, unimos nossa tradição familiar aos mais rigorosos padrões de confeitaria fina e panificação de fermentação natural, sempre com ingredientes selecionados e o atendimento caloroso que você merece.'
  ],
  storyHighlights: [
    { title: 'Forno a Lenha & Tradicional', desc: 'Fornadas quentinhas a partir das 5h da manhã todos os dias.' },
    { title: 'Ingredientes Puros', desc: 'Manteiga de primeira linha, farinhas especiais e zero conservantes químicos.' },
    { title: 'Cafeteria Completa', desc: 'Grãos selecionados moídos na hora e bebidas quentes e geladas.' },
    { title: 'Atendimento Afetuoso', desc: 'Mais de três décadas servindo com alegria no coração de Santana.' }
  ],
  
  // Contatos
  whatsappNumber: '557734842040',
  whatsappFormatted: '(77) 3484-2040',
  phoneNumber: '(77) 3484-2040',
  phoneTelLink: 'tel:+557734842040',
  instagramHandle: '@panificadoracostinha',
  instagramUrl: 'https://instagram.com/panificadoracostinha',
  
  // Endereço e Localização
  address: {
    street: 'Praça da Bandeira, 90',
    neighborhood: 'Centro',
    city: 'Santana',
    state: 'BA',
    zipCode: '47700-000',
    fullFormatted: 'Praça da Bandeira, 90 - Centro, Santana - BA, 47700-000',
    googleMapsUrl: 'https://maps.google.com/?q=Pra%C3%A7a+da+Bandeira,+90+-+Centro,+Santana+-+BA,+47700-000',
    googleMapsEmbedQuery: 'Praça da Bandeira, 90, Santana, Bahia, Brasil'
  },
  
  // Horários de Funcionamento Oficiais
  openingHours: [
    { dayName: 'Segunda-feira', dayShort: 'Seg', dayIndex: 1, openTime: '05:00', closeTime: '20:00' },
    { dayName: 'Terça-feira', dayShort: 'Ter', dayIndex: 2, openTime: '05:00', closeTime: '20:00' },
    { dayName: 'Quarta-feira', dayShort: 'Qua', dayIndex: 3, openTime: '05:00', closeTime: '20:00' },
    { dayName: 'Quinta-feira', dayShort: 'Qui', dayIndex: 4, openTime: '05:00', closeTime: '20:00' },
    { dayName: 'Sexta-feira', dayShort: 'Sex', dayIndex: 5, openTime: '05:00', closeTime: '19:00' },
    { dayName: 'Sábado', dayShort: 'Sáb', dayIndex: 6, openTime: '05:00', closeTime: '20:00' },
    { dayName: 'Domingo', dayShort: 'Dom', dayIndex: 0, openTime: '05:00', closeTime: '12:00' }
  ],
  
  // Identidade Visual
  logoText: 'COSTINHA',
  logoSubtext: 'PANIFICADORA & CAFÉ',
  heroBadge: 'Fornadas Quentes a Partir das 05h',
  heroImages: [
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=85'
  ],
  storyImages: [
    'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=80'
  ],
  storePhotos: [
    {
      id: 'fachada',
      src: '/fachada-costinha.jpg',
      title: 'Fachada Oficial da Panificadora Costinha',
      subtitle: 'Praça da Bandeira, 90 - Centro, Santana - BA • Telefone: (77) 3484-2040',
      badge: 'Fachada & Entrada Principal'
    },
    {
      id: 'interior',
      src: '/interior-costinha.jpg',
      title: 'Espaço Interno & Balcão de Atendimento',
      subtitle: 'Ambiente aconchegante com balcão de granito, vitrines de quitutes e bebidas geladas',
      badge: 'Ambiente Interno Tradicional'
    }
  ],
  instagramPhotos: [
    { image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', likes: 342, comments: 28, caption: 'Croissants douradinhos saindo do forno!' },
    { image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', likes: 512, comments: 45, caption: 'Pão de fermentação natural com casca crocante.' },
    { image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80', likes: 420, comments: 31, caption: 'Aquele cappuccino cremoso para começar o dia.' },
    { image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80', likes: 289, comments: 19, caption: 'Tortas decoradas feitas com amor sob encomenda.' },
    { image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80', likes: 618, comments: 52, caption: 'Pães de queijo recheados saindo na hora!' },
    { image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=600&q=80', likes: 395, comments: 24, caption: 'Café da manhã completo na Praça da Bandeira.' }
  ],
  
  // Categorias
  categories: [
    { id: 'todos', name: 'Todos os Itens', iconName: 'Sparkles', description: 'Explore todas as nossas delícias' },
    { id: 'paes', name: 'Pães Artesanais', iconName: 'Croissant', description: 'Fermentação natural e receitas tradicionais' },
    { id: 'cafes', name: 'Cafés & Bebidas', iconName: 'Coffee', description: 'Cafés especiais, cappuccinos e sucos naturais' },
    { id: 'salgados', name: 'Salgados & Lanches', iconName: 'Sandwich', description: 'Coxinhas, empadas, croissants salgados e tostex' },
    { id: 'confeitaria', name: 'Confeitaria & Bolos', iconName: 'Cake', description: 'Tortas finas, fatias doces e bolos caseiros' },
    { id: 'almoco', name: 'Pratos & Almoço', iconName: 'UtensilsCrossed', description: 'Refeições executivas e quiches especiais' },
    { id: 'sobremesas', name: 'Sobremesas', iconName: 'IceCream2', description: 'Doces tradicionais e sobremesas geladas' }
  ],
  
  // Cardápio de Produtos
  products: [
    {
      id: 'prod-pao-frances',
      name: 'Pão Francês Tradicional (Cesta com 6 un)',
      category: 'paes',
      price: 9.50,
      description: 'Crocante por fora, miolo leve e aerado. Fornadas de hora em hora desde as 5h.',
      fullDescription: 'O ícone mais amado do café da manhã brasileiro. Produzido com farinha selecionada e fermentação controlada, garantindo aquela casquinha dourada estaladiça e miolo aveludado.',
      ingredients: ['Farinha de trigo especial', 'Água mineral', 'Fermento biológico', 'Sal marinho refinado'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      badge: 'Mais Vendido',
      isPopular: true,
      preparationTime: 'Fornadas a cada 30 min'
    },
    {
      id: 'prod-croissant-manteiga',
      name: 'Croissant Francês de Pura Manteiga',
      category: 'paes',
      price: 14.90,
      description: 'Massa folhada artesanal com pura manteiga de primeira linha, dourado e amanteigado.',
      fullDescription: 'Respeitamos o método clássico francês com dobras artesanais e descanso de 24 horas. Textura que desmancha na boca e aroma irresistível de manteiga tostada.',
      ingredients: ['Farinha francesa T55', 'Manteiga extra sem sal', 'Leite integral', 'Açúcar demerara', 'Sal marinho'],
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      badge: 'Artesanal',
      isPopular: true,
      preparationTime: 'Pronto para servir'
    },
    {
      id: 'prod-sourdough-rustico',
      name: 'Pão Rústico de Fermentação Natural (Levain)',
      category: 'paes',
      price: 24.00,
      description: 'Fermentação lenta de 36 horas com farinhas integrais, casca caramelizada e acidez equilibrada.',
      fullDescription: 'Pão artesanal de altíssima digestibilidade feito com nosso fermento natural vivo (Levain). Apresenta alvéolos generosos, miolo elástico e sabor profundo e complexo.',
      ingredients: ['Farinha de trigo pura', 'Farinha integral de centeio', 'Levain (fermento vivo)', 'Água', 'Sal marinho'],
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
      badge: 'Especial da Casa',
      isPopular: true,
      preparationTime: 'Peça inteira ~ 600g'
    },
    {
      id: 'prod-pao-queijo-mineiro',
      name: 'Pão de Queijo Tradicional com Meia Cura (Porção 6 un)',
      category: 'salgados',
      price: 16.00,
      description: 'Receita legítima com generosa quantidade de queijo meia cura e polvilho doce artesanal.',
      fullDescription: 'Casca fininha e crocante com interior puxa-puxa repleto de queijo de verdade. Servido quentinho com cafezinho recém coado.',
      ingredients: ['Polvilho doce e azedo', 'Queijo meia cura curado', 'Ovos caipiras', 'Leite integral', 'Manteiga'],
      image: 'https://images.unsplash.com/photo-1598142981057-27b0c7cfd36c?auto=format&fit=crop&w=800&q=80',
      badge: 'Favorito',
      isPopular: true,
      preparationTime: '10 a 15 min'
    },
    {
      id: 'prod-cappuccino-costinha',
      name: 'Cappuccino Costinha com Chocolate Belga',
      category: 'cafes',
      price: 13.90,
      description: 'Espresso duplo encorpado, leite vaporizado com microespuma sedosa e raspas de chocolate belga 54%.',
      fullDescription: 'Nossa assinatura em cafeteria: equilíbrio impecável entre as notas tostadas do café arábica e a doçura aveludada do leite cremoso finalizado com chocolate nobre.',
      ingredients: ['Café 100% Arábica da Chapada', 'Leite integral vaporizado', 'Canela em pó opcional', 'Chocolate meio amargo'],
      image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
      badge: 'Destaque',
      isPopular: true,
      preparationTime: '5 min'
    },
    {
      id: 'prod-coxinha-frango-catupiry',
      name: 'Coxinha Especial de Frango com Catupiry Original',
      category: 'salgados',
      price: 11.50,
      description: 'Massa cremosa de batata artesanal, recheio farto de frango desfiado temperado e requeijão cremoso.',
      fullDescription: 'Frita na hora em óleo novo para garantir crocância máxima sem oleosidade. Recheio úmido e muito temperado com ervas frescas.',
      ingredients: ['Peito de frango desfiado', 'Catupiry original', 'Batata selecionada', 'Caldo aromático', 'Ervas finas'],
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
      badge: 'Crocante',
      isPopular: true,
      preparationTime: 'Pronta para servir'
    },
    {
      id: 'prod-sanduiche-costinha-premium',
      name: 'Sanduíche Costinha Especial no Pão Ciabatta',
      category: 'salgados',
      price: 26.90,
      description: 'Ciabatta artesanal com rosbife marinado, queijo gouda derretido, rúcula fresca e maionese trufada.',
      fullDescription: 'Um lanche completo e gourmet. O pão ciabatta com miolo levemente aerado abraça o recheio nobre aquecido na chapa.',
      ingredients: ['Pão ciabatta artesanal', 'Rosbife caseiro fatiado fino', 'Queijo gouda', 'Rúcula orgânica', 'Maionese artesanal da casa'],
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      badge: 'Chef Choice',
      isPopular: false,
      preparationTime: '10 a 15 min'
    },
    {
      id: 'prod-torta-holandesa',
      name: 'Torta Holandesa Suprema (Fatia Generosa)',
      category: 'confeitaria',
      price: 18.50,
      description: 'Creme aveludado de baunilha, coroa de biscoitos banhados em chocolate e ganache meio amargo nobre.',
      fullDescription: 'Uma das sobremesas mais aclamadas da nossa vitrine. Textura suave que derrete no paladar com o equilíbrio perfeito entre o doce e o amargor do cacau.',
      ingredients: ['Creme de leite fresco', 'Chocolate nobre 50%', 'Biscoitos holandeses com cobertura', 'Extrato natural de baunilha'],
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      badge: 'Confeitaria Fina',
      isPopular: true,
      preparationTime: 'Fatia individual gelada'
    },
    {
      id: 'prod-bolo-cenoura-brigadeiro',
      name: 'Bolo Caseiro de Cenoura com Vulcão de Brigadeiro',
      category: 'confeitaria',
      price: 16.00,
      description: 'Massa macia e úmida de cenoura natural com farta cobertura cremosa de brigadeiro de panela.',
      fullDescription: 'Sabor de infância elevado à perfeição. Feito com cenouras frescas raladas e brigadeiro artesanal feito com chocolate 50% cacau.',
      ingredients: ['Cenouras frescas', 'Ovos', 'Farinha de trigo', 'Leite condensado cremoso', 'Cacau em pó'],
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
      badge: 'Caseiro',
      isPopular: false,
      preparationTime: 'Fatia farta'
    },
    {
      id: 'prod-almoco-executivo-file',
      name: 'Prato Executivo: Filé Mignon ao Molho Madeira',
      category: 'almoco',
      price: 39.90,
      description: 'Medalhão de filé mignon grelhado, molho madeira com cogumelos frescos, arroz branco e batatas rústicas.',
      fullDescription: 'Opção refinada para o seu almoço no centro de Santana. Acompanha pequena salada de folhas e tomate cereja.',
      ingredients: ['Medalhão de filé mignon', 'Vinho tinto e demi-glace', 'Cogumelos paris frescos', 'Arroz branco aromatizado', 'Batatas assadas com alecrim'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Almoço Executivo',
      isPopular: true,
      preparationTime: '15 a 20 min'
    },
    {
      id: 'prod-suco-laranja-natural',
      name: 'Suco de Laranja da Terra Espremido na Hora (500ml)',
      category: 'cafes',
      price: 9.90,
      description: '100% fruta fresca espremida na hora do pedido, sem adição de água ou açúcar.',
      fullDescription: 'Laranjas doces e suculentas colhidas na região. Pura vitamina C e refrescância natural.',
      ingredients: ['Laranja pera fresca selecionada'],
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
      badge: '100% Natural',
      isPopular: false,
      preparationTime: 'Feito na hora'
    },
    {
      id: 'prod-torta-limao-siciliano',
      name: 'Mini Torta de Limão Siciliano com Merengue Tostado',
      category: 'sobremesas',
      price: 15.50,
      description: 'Massa sablée crocante, curd sedoso de limão siciliano e merengue italiano maçaricado.',
      fullDescription: 'Harmonia exemplar entre a acidez refrescante do limão siciliano e a leveza adocicada do merengue tostado ao vivo.',
      ingredients: ['Farinha de amêndoas', 'Manteiga', 'Suco de limão siciliano', 'Gemas pasteurizadas', 'Merengue italiano'],
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
      badge: 'Doce do Dia',
      isPopular: false,
      preparationTime: 'Unidade individual'
    }
  ]
};

/**
 * Exemplo de configuração demonstrativa alternativa (Restaurante Maison Grill),
 * mostrando a extrema versatilidade comercial deste template para outros clientes.
 */
export const maisonGrillConfig: RestaurantConfig = {
  id: 'maison-grill',
  name: 'Maison Grill Steakhouse',
  tagline: 'Carnes Nobres na Brasa, Hamburgueria & Alta Gastronomia',
  shortDescription: 'Cortes nobres preparados no fogo de chão e na brasa viva, acompanhados de coquetelaria autoral e uma adega exclusiva.',
  foundingYear: 2018,
  storyTitle: 'O templo das carnes nobres e do autêntico sabor na brasa',
  storyText: [
    'O Maison Grill nasceu para redefinir a experiência de saborear cortes nobres de alta linhagem com técnicas de fogo ancestrais e hospitalidade de padrão internacional.',
    'Nossas carnes são maturadas no processo de Dry Aged artesanal, garantindo maciez inigualável e notas aromáticas marcantes a cada mordida.'
  ],
  storyHighlights: [
    { title: 'Dry Aged Próprio', desc: 'Câmara de maturação controlada para sabores profundos.' },
    { title: 'Cortes Black Angus', desc: 'Certificação de origem e marmoreio superior.' },
    { title: 'Coquetelaria Criativa', desc: 'Carta de drinks autorais e clássicos repensados.' }
  ],
  whatsappNumber: '5577999998888',
  whatsappFormatted: '(77) 99999-8888',
  phoneNumber: '(77) 3484-9000',
  phoneTelLink: 'tel:+557734849000',
  instagramHandle: '@maisongrilloficial',
  instagramUrl: 'https://instagram.com',
  address: {
    street: 'Avenida das Nações, 1500',
    neighborhood: 'Jardim América',
    city: 'Santana',
    state: 'BA',
    zipCode: '47700-000',
    fullFormatted: 'Av. das Nações, 1500 - Santana - BA',
    googleMapsUrl: 'https://maps.google.com',
    googleMapsEmbedQuery: 'Av das Nacoes, Santana, Bahia'
  },
  openingHours: [
    { dayName: 'Segunda-feira', dayShort: 'Seg', dayIndex: 1, openTime: '11:30', closeTime: '23:00' },
    { dayName: 'Terça-feira', dayShort: 'Ter', dayIndex: 2, openTime: '11:30', closeTime: '23:00' },
    { dayName: 'Quarta-feira', dayShort: 'Qua', dayIndex: 3, openTime: '11:30', closeTime: '23:00' },
    { dayName: 'Quinta-feira', dayShort: 'Qui', dayIndex: 4, openTime: '11:30', closeTime: '23:30' },
    { dayName: 'Sexta-feira', dayShort: 'Sex', dayIndex: 5, openTime: '11:30', closeTime: '00:00' },
    { dayName: 'Sábado', dayShort: 'Sáb', dayIndex: 6, openTime: '11:30', closeTime: '00:00' },
    { dayName: 'Domingo', dayShort: 'Dom', dayIndex: 0, openTime: '11:30', closeTime: '18:00' }
  ],
  logoText: 'MAISON GRILL',
  logoSubtext: 'STEAKHOUSE & BISTRÔ',
  heroBadge: 'Cortes Black Angus & Fogo de Chão',
  heroImages: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85'
  ],
  storyImages: [
    'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  ],
  instagramPhotos: [
    { image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', likes: 742, comments: 63, caption: 'Tomahawk Black Angus grelhado no ponto.' },
    { image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', likes: 890, comments: 88, caption: 'Smash Burger artesanal com cheddar inglês.' },
    { image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', likes: 450, comments: 34, caption: 'Petit Gâteau belga com sorvete de baunilha.' },
    { image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', likes: 320, comments: 20, caption: 'Seleção especial da nossa adega climatizada.' }
  ],
  categories: [
    { id: 'todos', name: 'Todos os Itens', iconName: 'Sparkles', description: 'Todos os pratos e bebidas' },
    { id: 'entradas', name: 'Entradas', iconName: 'Flame', description: 'Carpaccios, tábuas e pão de alho gourmet' },
    { id: 'pratos', name: 'Pratos Principais', iconName: 'Utensils', description: 'Picanha, Ancho, Chorizo e Prime Rib' },
    { id: 'burgers', name: 'Hambúrgueres', iconName: 'Sandwich', description: 'Blends nobres no pão brioche artesanal' },
    { id: 'pizzas', name: 'Pizzas Artesanais', iconName: 'Pizza', description: 'Massa fermentada 48h assada a 450°C' },
    { id: 'bebidas', name: 'Bebidas & Drinks', iconName: 'Wine', description: 'Coquetéis autorais e vinhos selecionados' },
    { id: 'sobremesas', name: 'Sobremesas', iconName: 'IceCream', description: 'Doces elaborados pelos nossos chefs' }
  ],
  products: [
    {
      id: 'prod-ancho-angus',
      name: 'Ojo de Bife / Bife Ancho Black Angus (400g)',
      category: 'pratos',
      price: 89.90,
      description: 'Corte alto com farto marmoreio preparado na parrilla com sal grosso defumado e manteiga de chimichurri.',
      ingredients: ['Corte Black Angus certificado', 'Manteiga de chimichurri', 'Sal de parrilla defumado'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      badge: 'Especial do Chef',
      isPopular: true
    },
    {
      id: 'prod-burger-truffled',
      name: 'Burger Maison Trufado',
      category: 'burgers',
      price: 44.90,
      description: 'Blend de 180g de Angus, queijo brie maçaricado, cogumelos salteados no azeite trufado e maionese de alho negro.',
      ingredients: ['Pão brioche', 'Blend Angus 180g', 'Queijo brie', 'Azeite trufado', 'Geleia de bacon'],
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      badge: 'Mais Pedido',
      isPopular: true
    }
  ]
};

/**
 * CONFIGURAÇÃO PADRÃO ATIVA DO SITE:
 * Para trocar o restaurante padrão do projeto, basta alterar a constante abaixo!
 */
export const activeRestaurantConfig: RestaurantConfig = panificadoraCostinhaConfig;

// =====================================================================
// UTILITÁRIOS E HELPERS DE CONVERSÃO
// =====================================================================

export function formatBRL(amount: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);
}

/**
 * Gera o link para pedido direto de um único produto no WhatsApp
 */
export function getWhatsAppProductUrl(
  config: RestaurantConfig,
  product: MenuItem,
  quantity = 1,
  notes = ''
): string {
  const total = product.price * quantity;
  let message = `Olá! Gostaria de fazer um pedido na *${config.name}*.\n\n`;
  message += `🛒 *Item:* ${product.name}\n`;
  message += `🔢 *Quantidade:* ${quantity}x\n`;
  message += `💵 *Valor:* ${formatBRL(total)}\n`;
  
  if (notes && notes.trim().length > 0) {
    message += `📝 *Observações:* ${notes.trim()}\n`;
  }
  
  message += `\nPor favor, confirme a disponibilidade e o prazo de entrega/retirada. Obrigado!`;
  
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${encodedText}`;
}

/**
 * Gera o link para envio da sacola completa com múltiplos itens no WhatsApp
 */
export function getWhatsAppCartUrl(
  config: RestaurantConfig,
  items: { product: MenuItem; quantity: number; notes?: string }[],
  customerInfo?: { name: string; deliveryMethod: 'retirada' | 'entrega'; address?: string }
): string {
  let message = `Olá! Gostaria de fazer um pedido na *${config.name}*:\n\n`;
  
  let subtotal = 0;
  items.forEach((item, index) => {
    const itemTotal = item.product.price * item.quantity;
    subtotal += itemTotal;
    message += `${index + 1}. *${item.product.name}* (${item.quantity}x)\n`;
    message += `   └ Subtotal: ${formatBRL(itemTotal)}\n`;
    if (item.notes && item.notes.trim().length > 0) {
      message += `   └ Obs: ${item.notes.trim()}\n`;
    }
  });

  message += `\n💰 *VALOR TOTAL: ${formatBRL(subtotal)}*\n\n`;

  if (customerInfo) {
    if (customerInfo.name) {
      message += `👤 *Cliente:* ${customerInfo.name}\n`;
    }
    message += `📦 *Modalidade:* ${customerInfo.deliveryMethod === 'entrega' ? 'Entrega (Delivery)' : 'Retirada no Balcão'}\n`;
    if (customerInfo.deliveryMethod === 'entrega' && customerInfo.address) {
      message += `📍 *Endereço de Entrega:* ${customerInfo.address}\n`;
    }
  }

  message += `\nAguardo a confirmação do pedido e chave Pix / forma de pagamento. Obrigado!`;

  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${config.whatsappNumber}?text=${encodedText}`;
}

/**
 * Verifica se o restaurante está aberto agora baseado no dia e horário real
 */
export function getRestaurantOpenStatus(openingHours: RestaurantConfig['openingHours']): {
  isOpen: boolean;
  message: string;
  todaySchedule: string;
  nextOpening?: string;
} {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 = Dom, 1 = Seg, ...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todaySchedule = openingHours.find(h => h.dayIndex === currentDayIndex);

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      isOpen: false,
      message: 'Fechado hoje',
      todaySchedule: 'Fechado'
    };
  }

  const [openHour, openMin] = todaySchedule.openTime.split(':').map(Number);
  const [closeHour, closeMin] = todaySchedule.closeTime.split(':').map(Number);

  const openTotalMin = openHour * 60 + openMin;
  const closeTotalMin = closeHour * 60 + closeMin;

  const isOpen = currentMinutes >= openTotalMin && currentMinutes < closeTotalMin;

  if (isOpen) {
    return {
      isOpen: true,
      message: `Aberto agora • Fecha às ${todaySchedule.closeTime}`,
      todaySchedule: `${todaySchedule.openTime} às ${todaySchedule.closeTime}`
    };
  } else if (currentMinutes < openTotalMin) {
    return {
      isOpen: false,
      message: `Abre hoje às ${todaySchedule.openTime}`,
      todaySchedule: `${todaySchedule.openTime} às ${todaySchedule.closeTime}`
    };
  } else {
    return {
      isOpen: false,
      message: `Fechado por hoje • Abre amanhã às 05:00`,
      todaySchedule: `${todaySchedule.openTime} às ${todaySchedule.closeTime}`
    };
  }
}
