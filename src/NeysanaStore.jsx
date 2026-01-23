import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Phone, Menu, X, Globe, Zap, Heart, Facebook, Instagram, Mail, CreditCard, Truck, Info, Star, CheckCircle, ArrowRight } from 'lucide-react';

// Ruta del logo - usar siempre desde public/img
// En desarrollo: /img/ funciona directamente
// En producción: se ajustará con el base path automáticamente
const logoUrl = `${import.meta.env.BASE_URL}img/Gemini_Generated_Image_2frb7c2frb7c2frb.png`;

// Función helper para obtener URL de imagen de producto
const getProductImageUrl = (imageName) => {
  return `${import.meta.env.BASE_URL}img/productos/${imageName}`;
};

// Función helper para obtener URL de imagen de aliados
const getPartnerImageUrl = (imageName) => {
  return `${import.meta.env.BASE_URL}img/aliados/${imageName}`;
};

// Función helper para obtener URL de iconos de pago
const getPaymentIconUrl = (iconName) => {
  return `${import.meta.env.BASE_URL}img/pago/${iconName}`;
};

// ====================================================================
// COMPONENTES AUXILIARES
// ====================================================================

// Componente auxiliar para las tarjetas (Misión, Visión, Valores)
const AboutCard = ({ icon, title, text, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-emerald-500">
    <div className={`${color} mb-3`}>{icon}</div>
    <h4 className="text-xl font-bold text-gray-800 mb-3">{title}</h4>
    <p className="text-gray-600 text-sm">{text}</p>
  </div>
);

// Componente de Testimonios
const TestimonialCard = ({ name, location, rating, comment, avatar }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
    <div className="flex items-center mb-4">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center text-white text-xl font-bold mr-3">
        {avatar}
      </div>
      <div>
        <h4 className="font-bold text-gray-800">{name}</h4>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
    <div className="flex mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
      ))}
    </div>
    <p className="text-gray-600 text-sm italic">"{comment}"</p>
  </div>
);

// Componente Modal de Producto
const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !product) return null;

  const productDetails = {
    1: {
      function: 'Sistema cardiovascular y cerebrovascular, glucosa en la sangre y gastrointestinal',
      benefits: ['Desintoxicante natural para el organismo', 'Regula niveles de colesterol, triglicéridos y viscosidad en la sangre', 'Mejora la circulación y oxigena la sangre', 'Dilata las arterias para evitar taponamientos', 'Controla las punzadas o presiones en el sistema cardíaco y respiratorio', 'Ayuda a eliminar vena varice, arañitos, y vasitos sanguíneos', 'Previene pre infartos, trombos, coágulos, cáncer'],
      ingredients: 'Graviola y moringa',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    2: {
      function: 'Proteger todas las células y tejidos de nuestro cuerpo, funciona como un suplemento vitamínico y protector orgánico',
      benefits: ['Protege el sistema inmunológico, cardiovascular y nervio cerebral', 'Protege los huesos, articulaciones, tendones y fibras musculares', 'Ayuda a controlar los dolores musculares, adormecimiento y calambres', 'Ayuda a una buena formación, desarrollo y crecimiento', 'Ayuda a la formación de glóbulos blancos', 'Previene la osteoporosis, la artritis, y la artrosis', 'Funciona como fisioterapéutico para afectaciones como la escoliosis'],
      ingredients: 'Calostro de bovino y ovino',
      dosage: 'Tomar una cucharadita dulcera o 5 ML después del desayuno. (La posología varía según las patologías del cliente)'
    },
    3: {
      function: 'Proteger la parte estética del cuerpo, las articulaciones, y el sistema inmunológico',
      benefits: ['Ayuda a controlar problemas de dermatitis, melanina, de grasa cutánea o humectación en la piel', 'Ayuda a combatir el acné, puntos negros', 'Ayuda a quemar grasa en el tejido adiposo para la tonificación del cuerpo', 'Fortalece las uñas', 'Ayuda a proteger el cuero cabelludo, previene la caída del cabello y ayuda a su crecimiento', 'Ayuda a regenerar el líquido sinovial de las articulaciones para evitar la artritis y la artrosis', 'Controla los calambres, dolores y adormecimientos del cuerpo'],
      ingredients: 'Biotina con Vitamina E',
      dosage: 'Tomar una cucharadita dulcera o 5 ML después del desayuno o antes del almuerzo. También se puede disolver 10 ML del colágeno y aplicar en una crema de preferencia en las horas de la noche si es para la piel o aplicar en un shampoo de preferencia en las horas de la mañana si es para el cabello. (La posología varía según las patologías del cliente)'
    },
    4: {
      function: 'Regular los problemas gastrointestinales y cardiovasculares',
      benefits: ['Ayuda a mejorar la digestión', 'Ayuda a combatir los problemas de estreñimiento', 'Ayuda a desinflamar el colon', 'Protege las paredes digestivas para combatir problemas de gastritis o úlceras', 'Previene el cáncer', 'Mejora el funcionamiento de la vesícula', 'Ayuda a regular problemas de colesterol y triglicéridos', 'Acelera el metabolismo'],
      ingredients: 'Cidra y guanabana',
      dosage: 'Tomar una cucharadita dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    5: {
      function: 'Bajar de peso, ayuda a quemar grasa corporal del cuerpo, y limpia los filtros principales del cuerpo',
      benefits: ['Tonifica el cuerpo', 'Quema grasa del tejido adiposo', 'Acelera el metabolismo', 'Mejora el funcionamiento de la vesícula', 'Elimina los triglicéridos altos en la circulación', 'Mejora la oxigenación', 'Elimina grasa mal depositada del cuerpo'],
      ingredients: 'Té verde, alcachofa, durazno, manzanilla, jengibre, apio',
      dosage: 'Tomar una cucharadita dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    6: {
      function: 'Sistema nervioso central, ayuda como oxigenante, desinflamatorio, y restaurador',
      benefits: ['Controla los mareos, vértigos, dolores de cabeza', 'Ayuda a la producción de energía, quita el agotamiento y el cansancio', 'Estimula el sistema nervioso central para descansar correctamente en la noche', 'Protege las neuronas y los neurotransmisores', 'Previene enfermedades como Alzheimer, el Parkinson, la trombosis, el insomnio, demencia senil'],
      ingredients: 'Con fósforo y hierro',
      dosage: 'Tomar una cucharadita dulcera o 5 ML 30 minutos antes de acostarse. (La posología varía según las patologías del cliente)'
    },
    7: {
      function: 'Ayuda a calcificar los huesos, y proteger las articulaciones',
      benefits: ['Ayuda a controlar los dolores musculares', 'Previene los hormigueos, calambres y adormecimientos de las articulaciones', 'Regenera el líquido sinovial', 'Protege los tendones', 'Evita la escoliosis', 'Previene la osteopenia, osteoporosis, artritis, artrosis, túnel carpiano', 'Ayuda para el fortalecimiento del músculo esquelético', 'Proporciona energía y rendimiento'],
      ingredients: 'Calcio, magnesio y zinc',
      dosage: 'Tomar una cucharadita dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    8: {
      function: 'Desinflamar la próstata, mejorar el funcionamiento renal, y la actividad sexual',
      benefits: ['Evita la hiperplasia prostática', 'Calcifica la próstata', 'Previene el síndrome de prostatitis', 'Evita taponamientos en la uretra', 'Evita la micción frecuente', 'Evita la enfermedad precoz', 'Mejora la testosterona', 'Mejora la transmisión de la erección', 'Controla las deficiencias de espermatozoides en el semen'],
      ingredients: 'Maca, borojó, chontaduro',
      dosage: 'Tomar una cucharadita dulcera o 5 ML después del desayuno y 15 minutos antes de la actividad sexual. (La posología varía según las patologías del cliente)'
    },
    9: {
      function: 'Controlar los problemas hormonales en la mujer y del hombre',
      benefits: ['Regula los estrógenos o ciclo menstrual', 'Previene los quistes, miomas, cáncer en las ovarios', 'Previene los fibroadenomas o mastitis en los senos', 'Ayuda como desinflamatorio', 'Controla los dolores bajitos', 'Regula el pH', 'Previene los síntomas de cistitis o infecciones urinarias', 'Previene la hiperplasia en la próstata', 'Mejora la testosterona, gonadotropina y prolactina'],
      ingredients: 'Maca, borojó, chontaduro',
      dosage: 'Tomar una cucharadita dulcera o 5 ML después del desayuno. (La posología varía según las patologías del cliente)'
    },
    10: {
      function: 'Fortalecer el sistema inmunológico, mejorar la oxigenación cardio respiratoria, subir las defensas',
      benefits: ['Regenera glóbulos blancos y rojos y todas las plaquetas del cuerpo', 'Ayuda a prevenir el asma, la bronquitis, y la rinitis', 'Ayuda a controlar la fatiga', 'Controla los ronquidos', 'Controla los mareos y vértigos', 'Ayuda como desinflamatorio y expectorante', 'Mantiene las células del cuerpo estables', 'Protege los pulmones', 'Protege el sistema cardio respiratorio', 'Mejora la oxigenación', 'Controla los dolores del pecho y las punzadas en el corazón'],
      ingredients: 'Miel de abejas, jalea real, polen, mangostino',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas y 15 minutos antes de acostarse. (La posología varía según las patologías del cliente)'
    },
    11: {
      function: 'Mejorar el funcionamiento del cuerpo',
      benefits: ['Ayuda a proporcionar energía natural', 'Controla los dolores de cuerpo', 'Recupera las fibras musculares', 'Mejora el funcionamiento neurológico y cardíaco', 'Regenera los glóbulos rojos', 'Mejora el funcionamiento cardiovascular', 'Oxigena el torrente sanguíneo', 'Fortalecer el sistema inmunológico', 'Ayuda al aumento de masa muscular', 'Protege los tejidos del cuerpo'],
      ingredients: 'Maca y todas las vitaminas del complejo B',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    12: {
      function: 'Mejorar el funcionamiento cardiovascular, gastrointestinal y renal',
      benefits: ['Funciona como desintoxicante natural', 'Elimina el colesterol y triglicéridos', 'Mejora el funcionamiento renal', 'Mejora el nitrógeno ureico en la sangre', 'Previene el ácido úrico malo', 'Elimina los cálculos renales', 'Funciona como desinflamatorio', 'Mejora la flora intestinal', 'Quema grasa en los filtros del cuerpo', 'Mejora la oxigenación', 'Evita los mareos y vértigos', 'Controla los dolores lumbares y abdominales'],
      ingredients: 'Té verde, alcachofa, durazno, manzanilla y apio',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    13: {
      function: 'Estimar el sistema nervioso, protege las células del cuerpo y mejora el funcionamiento de nuestro organismo',
      benefits: ['Ayuda a controlar la ansiedad y el estrés', 'Ayuda como antioxidante natural', 'Proporciona energía natural', 'Mejora el funcionamiento cardiovasculares y cerebrovascular', 'Mejora el funcionamiento gastrointestinal', 'Sube el sistema inmunológico', 'Protege las células del cuerpo', 'Previene el cáncer', 'Previene la inflamación de la próstata', 'Previene cálculos biliares y renales', 'Combate agentes patógenos, virus, y microorganismos malignos'],
      ingredients: 'Betaglucanos de ganoderma lucidum. Fortificado con vitaminas y minerales',
      dosage: 'Disolver una cucharada en un vaso de leche de su preferencia, y tomar durante el desayuno. (La posología varía según las patologías del cliente)'
    },
    14: {
      function: 'Proteger las células del cuerpo, los tejidos, los tendones, las articulaciones y huesos',
      benefits: ['Calcifica los huesos', 'Regenera el líquido sinovial en las articulaciones', 'Protege los tendones', 'Protege la masa muscular', 'Protege la piel, cabello y uñas', 'Previene el cáncer', 'Mejora la flexibilidad', 'Sube el sistema inmunológico', 'Protege el sistema cardíaco y neuronal', 'Proporciona energía natural y rendimiento'],
      ingredients: 'Betaglucanos de ganoderma lucidum, hierro y fósforo',
      dosage: 'Disolver una cucharada en un vaso de leche de su preferencia o jugo natural (no cítrico) o agua. (La posología varía según las patologías del cliente)'
    },
    15: {
      function: 'Proteger todos los tejidos y células del cuerpo',
      benefits: ['Ayuda a proteger el tejido cerebral', 'Ayuda a controlar los dolores de cabeza', 'Protege los neurotransmisores', 'Ayuda como desinflamatorio para la próstata', 'Ayuda a combatir los mareos y vértigos', 'Mejora la oxigenación miocardial y respiratoria', 'Restaura glóbulos blancos y rojos', 'Funciona como energizante natural', 'Protege las neuronas', 'Protege la piel', 'Fortalece el cabello'],
      ingredients: 'Noni y uva',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    16: {
      function: 'Funcionamiento cardiovascular y cerebrovascular, la glucosa en la sangre y el sistema inmunológico',
      benefits: ['Funciona como un desintoxicante natural para el organismo', 'Regula los niveles de colesterol, triglicéridos y viscosidad en la sangre', 'Mejora la circulación y oxigena la sangre', 'Dilata las arterias para evitar taponamientos en las venas y las arterias', 'Controla las pulgadas o presiones en el sistema cardíaco y respiratorio', 'Ayuda a eliminar vena varice, arañitos, y vasitos sanguíneos', 'Previene pre infartos, trombos, coágulos, cáncer'],
      ingredients: 'Moringa y flor de Jamaica',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    17: {
      function: 'Recuperación de las fibras musculares, mayor rendimiento, proporciona energía natural, protege los huesos y articulaciones',
      benefits: ['Tonifica la masa muscular', 'Calcifica los huesos', 'Lubrica las articulaciones', 'Controla los dolores de cuerpo', 'Regenera la energía del cuerpo', 'Mejora el rendimiento', 'Recupera las fibras musculares'],
      ingredients: 'Creatina, fortificado con suero de leche y vitaminas',
      dosage: 'Disolver una cucharada en un vaso grande de leche de su preferencia, y tomar antes del ejercicio. (La posología varía según las patologías del cliente)'
    },
    18: {
      function: 'Desintoxicar el sistema cardiovascular de una manera más leve',
      benefits: ['Regula la presión arterial', 'Proporciona energía natural', 'Mejora la digestión', 'Dilata las arterias', 'Oxigena la sangre', 'Mejora la circulación', 'Fortalece el sistema inmunológico', 'Ayuda a la cicatrización'],
      ingredients: 'Aloe vera y espinaca',
      dosage: 'Tomar una cucharada dulcera o 5 ML en ayunas. (La posología varía según las patologías del cliente)'
    },
    19: {
      function: 'Aumento de masa muscular, recupera las fibras musculares, protege los tendones, huesos y articulaciones',
      benefits: ['Aumento de masa muscular', 'Calcifica los huesos', 'Fortalece los músculos', 'Controla los dolores de cuerpo', 'Regenera la energía del cuerpo', 'Mejora el rendimiento'],
      ingredients: 'Creatina y proteína de suero',
      dosage: 'Disolver una cucharada en un vaso grande de leche de su preferencia, y tomar antes del ejercicio. (La posología varía según las patologías del cliente)'
    },
    20: {
      function: 'Purgante que ayuda a eliminar la grasa del hígado y mejorar su funcionamiento',
      benefits: ['Previene la cirrosis, la hepatitis A, B, C', 'Previene problemas del colon y estreñimiento', 'Previene cálculos en la vesícula', 'Mejora la secreción de bilis en el cuerpo', 'Mejora la producción de energía en el cuerpo', 'Ayuda a acelerar el metabolismo', 'Mejora la absorción de nutrientes'],
      ingredients: 'Boldo, pitahaya, manzanilla deshidratada, fibra de avena, té verde, alcachofa',
      dosage: 'Disolver todo el contenido en un vaso de 30 Oz con agua de panela cruda, o jugo de piña sin colar o jugo de naranja. Ese día no desayunar. Hidratación constantemente. Almuerzo blando. Cena con normalidad, bajo en grasas. (El tratamiento genera soltura, se recomienda tomar un día que esté el paciente en descanso, tipo 6 AM)'
    },
    21: {
      function: 'Purgante que ayuda a desintoxicar el hígado, a desparasitar y mejora su funcionamiento',
      benefits: ['Previene la cirrosis, la hepatitis A, B, C', 'Previene los parásitos, oxiuros y tóxinas del hígado', 'Previene problemas del colon y estreñimiento', 'Previene cálculos en la vesícula', 'Mejora la secreción de bilis en el cuerpo', 'Mejora la producción de energía en el cuerpo', 'Ayuda a acelerar el metabolismo', 'Mejora la absorción de nutrientes'],
      ingredients: 'Ajo, mangostino, apio',
      dosage: 'Tomar una cucharadita dulcera en ayunas y 30 minutos antes de acostarse un día sábado. El domingo repetir el mismo procedimiento. A las 8 repetir la ingesta. Se puede consumir alimentos con normalidad. Preferiblemente no azúcares, no grasas. (El tratamiento no genera soltura)'
    }
  };

  const details = productDetails[product.id] || {
    function: product.description,
    benefits: ['Beneficio 1', 'Beneficio 2', 'Beneficio 3'],
    ingredients: 'Ingredientes naturales',
    dosage: 'Según indicaciones'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-full transition">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img 
                src={product.imageUrl || getProductImageUrl(product.image)} 
                alt={product.name}
                className="h-80 w-80 object-contain"
                onError={(e) => {
                  e.target.src = getProductImageUrl(product.image);
                }}
              />
            </div>
            <span className="inline-block text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Zap className="mr-2 text-emerald-600" size={20} />
                Función Principal
              </h3>
              <p className="text-gray-600">{details.function}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Heart className="mr-2 text-emerald-600" size={20} />
                Beneficios
              </h3>
              <ul className="space-y-2">
                {details.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start text-gray-600">
                    <CheckCircle className="mr-2 text-emerald-600 flex-shrink-0 mt-1" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Info className="mr-2 text-emerald-600" size={20} />
                Ingredientes
              </h3>
              <p className="text-gray-600">{details.ingredients}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Globe className="mr-2 text-emerald-600" size={20} />
                Dosificación
              </h3>
              <p className="text-gray-600">{details.dosage}</p>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Precio</p>
                  <p className="text-3xl font-bold text-emerald-700">
                    ${product.price.toLocaleString('es-CO')}
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onAddToCart) {
                      onAddToCart(product);
                    }
                    onClose();
                  }}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Agregar al Carrito</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Sección de Testimonios
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'María González',
      location: 'Bogotá, Colombia',
      rating: 5,
      comment: 'Excelente calidad en todos los productos. El colágeno hidrolizado ha mejorado mucho mi piel y el cabello. Muy recomendado.',
      avatar: 'M'
    },
    {
      name: 'Carlos Ramírez',
      location: 'Medellín, Colombia',
      rating: 5,
      comment: 'Los probióticos han cambiado mi vida. Me siento mucho mejor digestivamente y con más energía. El servicio al cliente es excepcional.',
      avatar: 'C'
    },
    {
      name: 'Ana Martínez',
      location: 'Cali, Colombia',
      rating: 5,
      comment: 'Compro regularmente la vitamina C y el multivitamínico. Productos de alta calidad y entrega rápida. Neysana Pluss es mi tienda de confianza.',
      avatar: 'A'
    },
    {
      name: 'Roberto Silva',
      location: 'Barranquilla, Colombia',
      rating: 5,
      comment: 'El Omega 3 ha mejorado significativamente mis niveles de colesterol. Los productos son naturales y efectivos. Muy satisfecho.',
      avatar: 'R'
    },
    {
      name: 'Laura Fernández',
      location: 'Bucaramanga, Colombia',
      rating: 5,
      comment: 'El aceite de coco es increíble para mi rutina de cuidado personal. Productos 100% naturales y precios justos. Excelente atención.',
      avatar: 'L'
    },
    {
      name: 'Diego Pérez',
      location: 'Pereira, Colombia',
      rating: 5,
      comment: 'Los suplementos de magnesio me han ayudado mucho con el sueño y la recuperación después del ejercicio. Muy profesionales.',
      avatar: 'D'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-emerald-800 mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-gray-600 text-lg">
          Miles de clientes satisfechos confían en Neysana Pluss
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={idx} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

// Componente de Sección de Aliados
const PartnersSection = () => {
  const partners = [
    { name: 'Innova Nutricion', image: 'Innova Nutricion.jpg' },
    { name: 'SABICO', image: 'SABICO.jpg' },
    { name: 'SENA - Red Tecnoparque Colombia', image: 'SENA RED TECNOPARQUE COLOMBIA.jpg' },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30 py-16 border-t border-emerald-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4">
            Aliados Estratégicos
          </h3>
          <p className="text-lg font-medium text-emerald-800 max-w-2xl mx-auto leading-relaxed">
            Trabajamos con las mejores instituciones para garantizar la calidad y excelencia de nuestros productos naturales
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 flex items-center justify-center group transform hover:-translate-y-2 hover:scale-105 border-2 border-transparent hover:border-emerald-300"
              style={{ minWidth: '200px', minHeight: '140px' }}
            >
              <img
                src={getPartnerImageUrl(partner.image)}
                alt={partner.name}
                className="max-h-24 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span class="text-gray-400 text-sm">${partner.name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Componente de Sección "Sobre Nosotros"
const AboutSection = ({ setCurrentView }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-4xl font-extrabold text-emerald-800 text-center mb-12">
      Conoce a Neysana Pluss ✨
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <AboutCard
        icon={<Globe size={36} />}
        title="Misión"
        text="Brindar atención médica integral con excelencia ética y calidez humana, transformando la salud de nuestros pacientes mediante procesos eficientes que superen sus expectativas."
        color="text-emerald-600"
      />
      <AboutCard
        icon={<Zap size={36} />}
        title="Visión"
        text="Ser un referente líder en salud a nivel nacional e internacional, reconocido por nuestra excelencia médica, responsabilidad social y la capacidad de transformar positivamente la vida de las personas."
        color="text-teal-600"
      />
      <AboutCard
        icon={<Heart size={36} />}
        title="Valores"
        text="Calidad, Integridad y Confianza. Nos comprometemos con la transparencia y el aval científico en cada uno de nuestros suplementos."
        color="text-green-600"
      />
    </div>

    <div className="bg-white p-8 rounded-xl shadow-xl">
      <h3 className="text-3xl font-bold text-emerald-700 mb-6 border-b pb-2">
        Certificaciones y Avales
      </h3>
      <p className="text-gray-600 mb-6">
        Neysana Pluss garantiza la pureza y eficacia de sus suplementos. Contamos con el aval de instituciones reconocidas y certificaciones que respaldan nuestra trayectoria.
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 mt-8">
        <div className="text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
          <img
            src={getPartnerImageUrl('Innova Nutricion.jpg')}
            alt="Innova Nutricion"
            className="max-h-24 mx-auto mb-3 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <p className="font-semibold text-sm text-gray-700 mt-2">Innova Nutricion</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
          <img
            src={getPartnerImageUrl('SABICO.jpg')}
            alt="SABICO"
            className="max-h-24 mx-auto mb-3 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <p className="font-semibold text-sm text-gray-700 mt-2">SABICO</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
          <img
            src={getPartnerImageUrl('SENA RED TECNOPARQUE COLOMBIA.jpg')}
            alt="SENA - Red Tecnoparque Colombia"
            className="max-h-24 mx-auto mb-3 object-contain"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <p className="font-semibold text-sm text-gray-700 mt-2">SENA - Red Tecnoparque Colombia</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all">
          <span className="text-5xl text-green-700 block mb-3">✅</span>
          <p className="font-semibold text-sm text-gray-700">Registro INVIMA</p>
        </div>
      </div>
    </div>

    <div className="text-center mt-12">
      <button
        onClick={() => setCurrentView('home')}
        className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg"
      >
        Volver a la Tienda
      </button>
    </div>
  </section>
);

// Componente de Sección "Servicios"
const ServicesSection = ({ setCurrentView }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h2 className="text-4xl font-extrabold text-emerald-800 text-center mb-12">
      Nuestros Servicios 🔬
    </h2>

    {/* Lista de Servicios */}
    <div className="bg-white rounded-xl shadow-xl p-8 mb-12">
      <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center">
        <Zap className="mr-2 text-emerald-600" size={28} />
        Servicios Disponibles
      </h3>
      <ul className="space-y-4">
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-emerald-600 flex-shrink-0" size={24} />
          <span className="text-lg"><strong>Examen Cuántico Bio - Eléctrico</strong></span>
        </li>
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-emerald-600 flex-shrink-0" size={24} />
          <span className="text-lg"><strong>Toma de Presión Arterial</strong></span>
        </li>
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-emerald-600 flex-shrink-0" size={24} />
          <span className="text-lg"><strong>Medición de Altura y Peso</strong></span>
        </li>
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-emerald-600 flex-shrink-0" size={24} />
          <span className="text-lg"><strong>Venta de Tratamientos Preventivos Naturales</strong></span>
        </li>
        <li className="flex items-center text-gray-700">
          <CheckCircle className="mr-3 text-emerald-600 flex-shrink-0" size={24} />
          <span className="text-lg"><strong>Asesoría Nutricional</strong></span>
        </li>
      </ul>
    </div>

    {/* Galería de Imágenes de Servicios */}
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-emerald-700 mb-6 text-center flex items-center justify-center">
        <Star className="mr-2 text-emerald-600" size={28} />
        Nuestros Servicios en Imágenes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
          <div className="relative h-64 overflow-hidden">
            <img
              src={getPartnerImageUrl('cliente.jpeg')}
              alt="Cliente satisfecho"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center"><span class="text-gray-400">Imagen no disponible</span></div>';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-semibold text-lg">Atención Personalizada</p>
              <p className="text-sm opacity-90">Nuestros clientes son nuestra prioridad</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
          <div className="relative h-64 overflow-hidden">
            <img
              src={getPartnerImageUrl('examinador cuantico.jpeg')}
              alt="Examinador Cuántico"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center"><span class="text-gray-400">Imagen no disponible</span></div>';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-semibold text-lg">Tecnología Avanzada</p>
              <p className="text-sm opacity-90">Examen Cuántico Bio-Eléctrico</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
          <div className="relative h-64 overflow-hidden">
            <img
              src={getPartnerImageUrl('examinadorc.jpeg')}
              alt="Equipo de Examen"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center"><span class="text-gray-400">Imagen no disponible</span></div>';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="font-semibold text-lg">Equipo Profesional</p>
              <p className="text-sm opacity-90">Cuidamos tu salud con excelencia</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Información del Examen Cuántico */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center">
          <Info className="mr-2 text-emerald-600" size={28} />
          ¿Qué Ofrece el Examen?
        </h3>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed">
            Nuestro servicio de salud funciona mediante el <strong className="text-emerald-700">analizador cuántico</strong>, 
            una tecnología avanzada de origen alemán que permite una evaluación integral del estado de salud.
          </p>
          <p className="text-lg leading-relaxed">
            Este innovador sistema determina el funcionamiento y comportamiento de <strong className="text-emerald-700">más de 32 sistemas del cuerpo humano</strong>, 
            proporcionando información detallada sobre el estado fisiológico, metabólico y energético de cada sistema evaluado.
          </p>
          <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-emerald-600">
            <p className="text-sm text-gray-600 italic">
              <strong>Beneficio clave:</strong> Permite identificar desequilibrios y patologías en etapas tempranas, 
              facilitando un abordaje preventivo y personalizado del cuidado de la salud.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
          <Heart className="mr-2 text-emerald-600" size={28} />
          Nuestros Tratamientos
        </h3>
        <div className="space-y-4 text-gray-700">
          <p className="text-lg leading-relaxed">
            Ofrecemos tratamientos naturales en presentaciones de <strong className="text-emerald-700">jarabe, liposolubles y preventivos</strong>, 
            formulados con ingredientes naturales de alta calidad.
          </p>
          <p className="text-lg leading-relaxed">
            Nuestros productos están diseñados para ayudar a combatir patologías en el organismo que están a tiempo de ser tratadas, 
            así como complementar el tratamiento de enfermedades diagnosticadas con medicamentos convencionales.
          </p>
        </div>
      </div>
    </div>

    {/* Información sobre el Analizador Cuántico */}
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-xl p-8 text-white">
      <div className="flex items-start space-x-6">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 flex-shrink-0">
          <Globe size={48} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Tecnología de Vanguardia</h3>
          <p className="text-lg leading-relaxed mb-4">
            El <strong>Analizador Cuántico Bio-Eléctrico</strong> utiliza tecnología alemana de última generación 
            para realizar una evaluación no invasiva y completa de tu estado de salud.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">32+</div>
              <div className="text-sm opacity-90">Sistemas Evaluados</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">No Invasivo</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold mb-2">Preciso</div>
              <div className="text-sm opacity-90">Tecnología Alemana</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-12">
      <button
        onClick={() => setCurrentView('home')}
        className="bg-emerald-600 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-700 transition shadow-lg mr-4"
      >
        Ver Productos
      </button>
      <button
        onClick={() => window.open('https://wa.me/573142743030', '_blank')}
        className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition shadow-lg"
      >
        <Phone className="inline mr-2" size={20} />
        Agendar Examen
      </button>
    </div>
  </section>
);

// Componente de Checkout
const CheckoutSection = ({ cart, total, onBack, onUpdateQuantity, onRemoveFromCart }) => {
  const [paymentMethod, setPaymentMethod] = useState('contra-entrega');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    referencia: '',
    notas: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentMethod === 'contra-entrega') {
      alert('¡Pedido registrado! Te contactaremos pronto para confirmar tu pedido y coordinar la entrega.');
    } else {
      alert('¡Pedido registrado! Por favor realiza el pago por Nequi o Daviplata y envía el comprobante por WhatsApp.');
    }
  };

  const shippingCost = 10000;
  const finalTotal = total + shippingCost;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
      >
        <ArrowRight className="mr-2 rotate-180" size={20} />
        Volver al inicio
      </button>

      <h2 className="text-4xl font-bold text-emerald-800 mb-8">Finalizar Compra</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resumen del Pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Método de Pago */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <CreditCard className="mr-2 text-emerald-600" size={24} />
              Método de Pago
            </h3>
            <div className="space-y-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="contra-entrega"
                  checked={paymentMethod === 'contra-entrega'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4"
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-800">Pago Contra Entrega</div>
                  <div className="text-sm text-gray-600">Paga cuando recibas tu pedido</div>
                </div>
                <Truck className="text-emerald-600" size={24} />
              </label>

              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <input
                  type="radio"
                  name="payment"
                  value="consignacion"
                  checked={paymentMethod === 'consignacion'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-4"
                />
                <div className="flex-1">
                  <div className="font-bold text-gray-800">Pago por Nequi y Daviplata</div>
                  <div className="text-sm text-gray-600">Transfiere a nuestros números</div>
                </div>
                <div className="flex items-center space-x-2">
                  <img 
                    src={getPaymentIconUrl('Nequi.png')} 
                    alt="Nequi" 
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <img 
                    src={getPaymentIconUrl('Daviplata.png')} 
                    alt="Daviplata" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Información de Pago Nequi y Daviplata */}
          {paymentMethod === 'consignacion' && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl shadow-lg p-6 border-2 border-emerald-200">
              <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center">
                <CreditCard className="mr-2 text-emerald-600" size={24} />
                Datos para Pago
              </h3>
              
              {/* Métodos de Pago */}
              <div className="mb-6 flex items-center justify-center space-x-4">
                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-md">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm overflow-hidden">
                    <img 
                      src={getPaymentIconUrl('Nequi.png')} 
                      alt="Nequi" 
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-800">Nequi</span>
                </div>
                <span className="text-gray-400 font-bold">y</span>
                <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-lg shadow-md">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm overflow-hidden">
                    <img 
                      src={getPaymentIconUrl('Daviplata.png')} 
                      alt="Daviplata" 
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-800">Daviplata</span>
                </div>
              </div>

              {/* Números de Pago */}
              <div className="space-y-4 mb-6">
                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">Número 1:</span>
                    <span className="font-mono text-xl font-bold text-blue-700">313 800 2732</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Titular:</span>
                    <span className="font-semibold text-blue-700">LUI** TAR**</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 flex items-center">
                      <CheckCircle className="mr-2 text-blue-600" size={14} />
                      Disponible para Nequi y Daviplata
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">Número 2:</span>
                    <span className="font-mono text-xl font-bold text-green-700">314 274 3030</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">Titular:</span>
                    <span className="font-semibold text-green-700">MAR** MAR**</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 flex items-center">
                      <CheckCircle className="mr-2 text-green-600" size={14} />
                      Disponible para Nequi y Daviplata
                    </p>
                  </div>
                </div>
              </div>

              {/* Nota importante */}
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-gray-700">
                  <strong className="text-yellow-700">⚠️ Importante:</strong> Después de realizar el pago, envía el comprobante por WhatsApp al número <strong>+57 313 800 2732</strong> o <strong>+57 314 274 3030</strong> para procesar tu pedido.
                </p>
              </div>
            </div>
          )}

          {/* Formulario de Envío */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Truck className="mr-2 text-emerald-600" size={24} />
              Información de Envío
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono *</label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección *</label>
                <input
                  type="text"
                  required
                  value={formData.direccion}
                  onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Calle, número, apartamento, etc."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad *</label>
                  <input
                    type="text"
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Departamento *</label>
                  <input
                    type="text"
                    required
                    value={formData.departamento}
                    onChange={(e) => setFormData({...formData, departamento: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Puntos de Referencia</label>
                <input
                  type="text"
                  value={formData.referencia}
                  onChange={(e) => setFormData({...formData, referencia: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Cerca de... (opcional)"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Notas Adicionales</label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => setFormData({...formData, notas: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  rows="3"
                  placeholder="Instrucciones especiales para la entrega (opcional)"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg transition shadow-lg flex items-center justify-center space-x-2"
              >
                <CheckCircle size={24} />
                <span>Confirmar Pedido</span>
              </button>
            </form>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Resumen del Pedido</h3>
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm mb-4">No hay productos en el carrito</p>
                <button
                  onClick={onBack}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition text-sm font-semibold"
                >
                  Agregar Productos
                </button>
              </div>
            ) : (
              <>
            <div className="space-y-3 mb-6">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <img 
                        src={item.imageUrl || getProductImageUrl(item.image)} 
                        alt={item.name}
                        className="h-12 w-12 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.target.src = getProductImageUrl(item.image);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">${item.price.toLocaleString('es-CO')} c/u</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onRemoveFromCart) {
                          onRemoveFromCart(item.id);
                        }
                      }}
                      className="text-red-500 hover:bg-red-100 p-1.5 rounded transition-all hover:scale-110 flex-shrink-0 ml-2"
                      title="Eliminar producto"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 bg-white rounded-lg p-1 border border-gray-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onUpdateQuantity) {
                            onUpdateQuantity(item.id, -1);
                          }
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-1 rounded transition w-7 h-7 flex items-center justify-center"
                        title="Disminuir cantidad"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 font-semibold text-sm min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onUpdateQuantity) {
                            onUpdateQuantity(item.id, 1);
                          }
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded transition w-7 h-7 flex items-center justify-center"
                        title="Aumentar cantidad"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-bold text-emerald-700 text-sm">
                      ${(item.price * item.quantity).toLocaleString('es-CO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${total.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío:</span>
                <span>${shippingCost.toLocaleString('es-CO')}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-emerald-700 pt-4 border-t">
                <span>Total:</span>
                <span>${finalTotal.toLocaleString('es-CO')}</span>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-600">
                <strong>Tiempo de entrega:</strong> 3-5 días hábiles
              </p>
            </div>
            </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ====================================================================
// COMPONENTE PRINCIPAL
// ====================================================================

const NeysanaStore = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const categories = ['Todos', 'Desintoxicante', 'Protectores', 'Cómplementos', 'Purgantes', 'Hormonales'];

  // Productos reales de Neysana Pluss
  const products = [
    { id: 1, name: 'Guana Max', category: 'Desintoxicante', price: 185000, originalPrice: 350000, discount: 47, image: 'Guana max.jpeg', imageUrl: getProductImageUrl('Guana max.jpeg'), description: 'Sistema cardiovascular y cerebrovascular' },
    { id: 2, name: 'Factor Max', category: 'Protectores', price: 185000, originalPrice: 370000, discount: 50, image: 'Factor max.jpeg', imageUrl: getProductImageUrl('Factor max.jpeg'), description: 'Protección celular y suplemento vitamínico' },
    { id: 3, name: 'Colágeno Liposoluble', category: 'Protectores', price: 185000, originalPrice: 335000, discount: 45, image: 'Colageno liposoluble.jpeg', imageUrl: getProductImageUrl('Colageno liposoluble.jpeg'), description: 'Piel, cabello, uñas y articulaciones' },
    { id: 4, name: 'Clorofila', category: 'Desintoxicante', price: 185000, originalPrice: 340000, discount: 46, image: 'Clorofila.jpeg', imageUrl: getProductImageUrl('Clorofila.jpeg'), description: 'Salud gastrointestinal y cardiovascular' },
    { id: 5, name: 'Svelfy', category: 'Desintoxicante', price: 185000, originalPrice: 345000, discount: 46, image: 'Svelfy.jpeg', imageUrl: getProductImageUrl('Svelfy.jpeg'), description: 'Control de peso y quema de grasa' },
    { id: 6, name: 'Vit C Brin', category: 'Cómplementos', price: 185000, originalPrice: 330000, discount: 44, image: 'Vita c bri.jpeg', imageUrl: getProductImageUrl('Vita c bri.jpeg'), description: 'Sistema nervioso central y oxigenante' },
    { id: 7, name: 'Calci Max', category: 'Cómplementos', price: 185000, originalPrice: 340000, discount: 46, image: 'Calci max.jpeg', imageUrl: getProductImageUrl('Calci max.jpeg'), description: 'Calcificación de huesos y articulaciones' },
    { id: 8, name: 'Prostmax', category: 'Hormonales', price: 185000, originalPrice: 335000, discount: 45, image: 'Prostmax.jpeg', imageUrl: getProductImageUrl('Prostmax.jpeg'), description: 'Salud prostática y función renal' },
    { id: 9, name: 'Ginvit', category: 'Hormonales', price: 185000, originalPrice: 340000, discount: 46, image: 'Ginvit.jpeg', imageUrl: getProductImageUrl('Ginvit.jpeg'), description: 'Control hormonal y salud reproductiva' },
    { id: 10, name: 'Forde Fem', category: 'Protectores', price: 185000, originalPrice: 350000, discount: 47, image: 'Forde.jpeg', imageUrl: getProductImageUrl('Forde.jpeg'), description: 'Fortalecimiento del sistema inmunológico' },
    { id: 11, name: 'BC Plus', category: 'Cómplementos', price: 185000, originalPrice: 330000, discount: 44, image: 'bcplus.jpeg', imageUrl: getProductImageUrl('bcplus.jpeg'), description: 'Energía natural y vitamina B' },
    { id: 12, name: 'Chan Plus', category: 'Desintoxicante', price: 185000, originalPrice: 340000, discount: 46, image: 'Chan plus.jpeg', imageUrl: getProductImageUrl('Chan plus.jpeg'), description: 'Desintoxicante cardiovascular y renal' },
    { id: 13, name: 'Coffee Pluss', category: 'Protectores', price: 195000, originalPrice: 360000, discount: 46, image: 'Coffee.jpeg', imageUrl: getProductImageUrl('Coffee.jpeg'), description: 'Estimulante del sistema nervioso'},
    { id: 14, name: 'Colágeno Marino', category: 'Protectores', price: 195000, originalPrice: 360000, discount: 46, image: 'Colageno Marino.jpeg', imageUrl: getProductImageUrl('Colageno Marino.jpeg'), description: 'Protección celular y regeneración' },
    { id: 15, name: 'Embri Plus', category: 'Protectores', price: 185000, originalPrice: 335000, discount: 45, image: 'Embri plus.jpeg', imageUrl: getProductImageUrl('Embri plus.jpeg'), description: 'Protección de tejidos y células' },
    { id: 16, name: 'Moringa', category: 'Desintoxicante', price: 185000, originalPrice: 330000, discount: 44, image: 'Moringa.jpeg', imageUrl: getProductImageUrl('Moringa.jpeg'), description: 'Desintoxicante cardiovascular' },
    { id: 17, name: 'Creatina Monohidrata', category: 'Cómplementos', price: 195000, originalPrice: 340000, discount: 43, image: 'Creatina monohidrata.jpeg', imageUrl: getProductImageUrl('Creatina monohidrata.jpeg'), description: 'Recuperación muscular y energía' },
    { id: 18, name: 'Bilogink', category: 'Desintoxicante', price: 185000, originalPrice: 330000, discount: 44, image: 'Bilogink.jpeg', imageUrl: getProductImageUrl('Bilogink.jpeg'), description: 'Desintoxicante cardiovascular leve' },
    { id: 19, name: 'Creatina Neutra', category: 'Cómplementos', price: 195000, originalPrice: 340000, discount: 43, image: 'Creatina neutra.jpeg', imageUrl: getProductImageUrl('Creatina neutra.jpeg'), description: 'Aumento de masa muscular' },
    { id: 20, name: 'Lax-At', category: 'Purgantes', price: 185000, originalPrice: 330000, discount: 44, image: 'Lax-At.jpeg', imageUrl: getProductImageUrl('Lax-At.jpeg'), description: 'Purgante y limpieza hepática' },
    { id: 21, name: 'Lax Plus', category: 'Purgantes', price: 185000, originalPrice: 330000, discount: 44, image: 'Lax plus.jpeg', imageUrl: getProductImageUrl('Lax plus.jpeg'), description: 'Desintoxicación y desparasitante' },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleCartClick = () => {
    if (cart.length > 0) {
      setShowCheckout(true);
      setIsCartOpen(false);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/30">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShowCheckout(false);
                setIsCartOpen(false);
                setCurrentView('home');
                setSelectedCategory('Todos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-3 hover:opacity-80 transition cursor-pointer"
            >
              <img 
                src={logoUrl}
                alt="Neysana Pluss Logo" 
                className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                onError={(e) => {
                  // Fallback: intentar diferentes rutas
                  const currentSrc = e.target.src;
                  console.log('Error cargando logo desde:', currentSrc);
                  
                  // Intentar la ruta alternativa
                  if (currentSrc.includes('/NeysanaPluss/')) {
                    e.target.src = '/img/Gemini_Generated_Image_2frb7c2frb7c2frb.png';
                  } else {
                    e.target.src = '/NeysanaPluss/img/Gemini_Generated_Image_2frb7c2frb7c2frb.png';
                  }
                }}
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700">Neysana Pluss S.A.S</h1>
                <p className="text-sm text-teal-600">Salud y Belleza</p>
              </div>
            </button>

            <div className="flex items-center space-x-4">
              {/* Redes Sociales */}
              <div className="hidden sm:flex items-center space-x-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition border border-gray-200 hover:border-blue-300"
                  title="Facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 p-2 rounded-lg hover:bg-gray-100 transition border border-gray-200 hover:border-pink-300"
                  title="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="mailto:empresaneysana@gmail.com"
                  className="text-gray-600 hover:text-red-600 p-2 rounded-lg hover:bg-gray-100 transition border border-gray-200 hover:border-red-300"
                  title="Gmail"
                >
                  <Mail size={20} />
                </a>
              </div>

              <button
                onClick={() => window.open('https://wa.me/573138002732', '_blank')}
                className="hidden sm:flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                <Phone size={20} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={handleCartClick}
                className="relative bg-emerald-600 text-white p-3 rounded-lg hover:bg-emerald-700 transition"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden text-emerald-700"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden mt-4 pb-4 space-y-2">
              {/* Sección Principal */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setSelectedCategory('Todos');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                    currentView === 'home' && selectedCategory === 'Todos'
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-gray-300'
                  }`}
                >
                  Productos
                </button>

                {currentView === 'home' && (
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {categories.filter(c => c !== 'Todos').map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsMobileMenuOpen(false);
                          // Scroll suave a la sección de productos cuando se cambia de categoría
                          setTimeout(() => {
                            const productsSection = document.getElementById('products-section');
                            if (productsSection) {
                              productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                          }, 100);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition text-left ${
                          selectedCategory === cat
                            ? 'bg-emerald-600 text-white shadow-lg'
                            : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-gray-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setCurrentView('services');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                    currentView === 'services'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  Servicios
                </button>

                <button
                  onClick={() => {
                    setCurrentView('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition text-left ${
                    currentView === 'about'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  Sobre Nosotros
                </button>
              </div>

              {/* Sección de Contacto */}
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-600 px-2 mb-2">Contacto</p>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 text-gray-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <Facebook size={20} />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-300 text-gray-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50 px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <Instagram size={20} />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="mailto:empresaneysana@gmail.com"
                    className="flex-1 border border-gray-300 text-gray-700 hover:text-red-600 hover:border-red-300 hover:bg-red-50 px-4 py-3 rounded-lg transition flex items-center justify-center space-x-2"
                  >
                    <Mail size={20} />
                    <span>Email</span>
                  </a>
                </div>
                <button
                  onClick={() => window.open('https://wa.me/573142743030', '_blank')}
                  className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition"
                >
                  <Phone size={20} />
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navegación */}
      {!showCheckout && (
      <div className="hidden sm:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => {
              setCurrentView('home');
                setSelectedCategory('Todos');
            }}
            className={`px-6 py-2 rounded-full font-medium transition ${
              currentView === 'home' && selectedCategory === 'Todos'
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Productos
          </button>

          {currentView === 'home' && categories.filter(c => c !== 'Todos').map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                // Scroll suave a la sección de productos cuando se cambia de categoría
                setTimeout(() => {
                  const productsSection = document.getElementById('products-section');
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className={`px-6 py-2 rounded-full font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              {cat}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentView('services')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              currentView === 'services'
                  ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Servicios
          </button>
          
          <button
            onClick={() => setCurrentView('about')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              currentView === 'about'
                  ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Sobre Nosotros
          </button>
        </div>
      </div>
      )}

      {/* Contenido Principal */}
      {showCheckout ? (
        <CheckoutSection
          cart={cart}
          total={total}
          onBack={() => {
            setShowCheckout(false);
            setCurrentView('home');
            setSelectedCategory('Todos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
        />
      ) : currentView === 'home' ? (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white py-16 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Productos Naturales</h2>
              <p className="text-xl mb-8">Tu salud y bienestar en cada producto</p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm">Natural</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">+1000</p>
                  <p className="text-sm">Clientes</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl font-bold">+21</p>
                  <p className="text-sm">Años</p>
                </div>
              </div>
            </div>
          </section>

          {/* Aliados Section - Solo cuando se muestra "Todos" los productos */}
          {selectedCategory === 'Todos' && <PartnersSection />}

          {/* Products Grid */}
          <main id="products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer" onClick={() => handleProductClick(product)}>
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 flex items-center justify-center relative">
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
                    <img 
                      src={product.imageUrl || getProductImageUrl(product.image)} 
                      alt={product.name}
                      className="h-64 w-64 object-contain"
                      onError={(e) => {
                        e.target.src = getProductImageUrl(product.image);
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                      {product.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toLocaleString('es-CO')}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-emerald-700">
                        ${product.price.toLocaleString('es-CO')}
                      </span>
                    </div>
                      <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center justify-center space-x-1"
                      >
                        <Plus size={18} />
                        <span>Agregar</span>
                      </button>
                  </div>
                </div>
              ))}
            </div>
          </main>

          {/* Aliados Section - Solo cuando se selecciona una categoría específica */}
          {selectedCategory !== 'Todos' && <PartnersSection />}

          {/* Testimonios Section */}
          <TestimonialsSection />
        </>
      ) : currentView === 'services' ? (
        <ServicesSection setCurrentView={setCurrentView} />
      ) : (
        <AboutSection setCurrentView={setCurrentView} />
      )}
      
      {/* Shopping Cart Sidebar */}
      {isCartOpen && !showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={() => setIsCartOpen(false)}>
          <div
            className="bg-white w-full sm:w-96 h-full overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-emerald-600 text-white p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Carrito</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:bg-emerald-700 p-2 rounded">
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 min-h-[calc(100vh-200px)]">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-white/80 backdrop-blur-sm rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center shadow-lg">
                    <ShoppingCart size={64} className="text-emerald-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h3>
                  <p className="text-gray-500 mb-6">Agrega productos para comenzar tu compra</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('home');
                    }}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition font-semibold shadow-md"
                  >
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <>
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4 mb-3 shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.imageUrl || getProductImageUrl(item.image)} 
                            alt={item.name}
                            className="h-16 w-16 object-contain flex-shrink-0"
                            onError={(e) => {
                              e.target.src = getProductImageUrl(item.image);
                            }}
                          />
                          <div>
                            <h3 className="font-bold text-gray-800">{item.name}</h3>
                            <p className="text-emerald-600 font-semibold">
                              ${item.price.toLocaleString('es-CO')}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="text-red-500 hover:bg-red-100 p-2 rounded transition-all hover:scale-110"
                          title="Eliminar producto"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 bg-white rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-lg text-gray-800">
                          ${(item.price * item.quantity).toLocaleString('es-CO')}
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="border-t-2 border-gray-200 pt-4 mt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-bold text-gray-700">Total:</span>
                      <span className="text-3xl font-bold text-emerald-700">
                        ${total.toLocaleString('es-CO')}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setShowCheckout(true);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg mb-3"
                    >
                      <ShoppingCart size={24} />
                      <span>Ir a Comprar</span>
                    </button>

                    <button
                      onClick={() => {
                        const message = cart.map(item =>
                          `${item.name} x${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-CO')}`
                        ).join('%0A');
                        const totalMsg = `%0A%0ATotal: $${total.toLocaleString('es-CO')}`;
                        window.open(`https://wa.me/573142743030?text=Hola! Quiero hacer el siguiente pedido:%0A%0A${message}${totalMsg}`, '_blank');
                      }}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition shadow-lg"
                    >
                      <Phone size={24} />
                      <span>Pedido por WhatsApp</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={addToCart}
        />
      )}

      {/* Footer */}
      {!showCheckout && (
        <footer className="bg-gradient-to-r from-slate-800 via-emerald-900 to-teal-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Neysana Pluss</h3>
                <p className="text-slate-300 mb-4">Productos naturales para tu salud y bienestar</p>
                <div className="flex space-x-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition border border-slate-600/30 hover:border-white/50"
                  >
                    <Facebook size={20} />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition border border-slate-600/30 hover:border-white/50"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="mailto:empresaneysana@gmail.com"
                    className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/10 transition border border-slate-600/30 hover:border-white/50"
                  >
                    <Mail size={20} />
                  </a>
                </div>
              <button 
                onClick={() => setCurrentView('about')}
                  className="text-sm font-semibold text-emerald-400 hover:text-white transition mt-4 block"
              >
                Leer más sobre nosotros →
              </button>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
                <p className="text-slate-300 mb-2">📞 WhatsApp: +57 313 800 2732</p>
                <p className="text-slate-300 mb-2">📞 WhatsApp: +57 314 274 3030</p>
                <p className="text-slate-300 mb-2">📧 empresaneysana@gmail.com</p>
                <p className="text-slate-300">📍Carrera 113 A # 74 - 12 , Barrio: Villas de granada, Bogotá.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Horario</h3>
                <p className="text-slate-300">Lunes - Viernes: 7:30am - 4:30pm</p>
                <p className="text-slate-300">Sábados: 7:30am - 4:30pm</p>
                <p className="text-slate-300">Domingos: Cerrado</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Trabaja con Nosotros</h3>
                <p className="text-slate-300 mb-3">¿Quieres formar parte de nuestro equipo?</p>
                <p className="text-slate-300 mb-3">Envía tu hoja de vida a:</p>
                <a 
                  href="mailto:empresaneysana@gmail.com?subject=Hoja de Vida - Candidato"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center transition"
                >
                  <Mail className="mr-2" size={18} />
                  empresaneysana@gmail.com
                </a>
            </div>
          </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-300">
            <p>© 2026 Neysana Pluss. Todos los derechos reservados.</p>
          </div>
          
        </div>
      </footer>
      )}

      {/* WhatsApp Floating Button */}
      {!showCheckout && (
      <button
        onClick={() => window.open('https://wa.me/573142743030', '_blank')}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-50 animate-bounce"
      >
        <Phone size={28} />
      </button>
      )}
    </div>
  );
};

export default NeysanaStore;
