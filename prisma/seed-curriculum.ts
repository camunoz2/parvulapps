import type { Prisma, PrismaClient } from '@prisma/client'

export async function generateCurriculum(
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >
) {
  // Ambitos ///////////////////

  const categoryA = await prisma.category.create({
    data: {
      description: 'Desarrollo Personal y Social',
    },
  })
  const categoryB = await prisma.category.create({
    data: {
      description: 'Comunicación Integral',
    },
  })
  const categoryC = await prisma.category.create({
    data: {
      description: 'Interacción y Comprensión del Entorno',
    },
  })

  // Nucleos ////////////////////
  const coreA = await prisma.core.create({
    data: {
      description: 'Identidad y Autonomía',
      categoryId: categoryA.id,
    },
  })
  const coreB = await prisma.core.create({
    data: {
      description: 'Convivencia y Ciudadanía',
      categoryId: categoryA.id,
    },
  })
  const coreC = await prisma.core.create({
    data: {
      description: 'Corporalidad y Movimiento',
      categoryId: categoryA.id,
    },
  })

  const coreD = await prisma.core.create({
    data: {
      description: 'Lenguaje Verbal',
      categoryId: categoryB.id,
    },
  })
  const coreE = await prisma.core.create({
    data: {
      description: 'Lenguajes Artísticos',
      categoryId: categoryB.id,
    },
  })
  const coreF = await prisma.core.create({
    data: {
      description: 'Exploración del Entorno Natural',
      categoryId: categoryC.id,
    },
  })
  const coreG = await prisma.core.create({
    data: {
      description: 'Comprensión del Entorno Sociocultural',
      categoryId: categoryC.id,
    },
  })
  const coreH = await prisma.core.create({
    data: {
      description: 'Pensamiento Matemático',
      categoryId: categoryC.id,
    },
  })

  // Objetivos ////////////////////

  const OA_1 = [
    'Expresar vocal, gestual o corporalmente distintas necesidades o emociones (alegría, miedo, pena, entre otras).',
    'Manifestar satisfacción cuando percibe que adultos significativos le expresan afecto.',
    'Reconocer algunas emociones en adultos significativos, reaccionando frente a ellas.',
    'Manifestar sus preferencias por algunas situaciones, objetos y juegos.',
    'Manifestar interés por nuevas situaciones u objetos, ampliando su campo y repertorio de acción habitual.',
    'Reconocer algunos rasgos distintivos de su identidad, tales como: su nombre y su imagen física en el espejo.',
    'Incorporar rutinas básicas vinculadas a la alimentación, vigilia, sueño, higiene, y vestuario dentro de un contexto diferente a su hogar y sensible a sus necesidades personales.',
  ]

  const OA_2 = [
    'Representar verbal y corporalmente diferentes emociones y sentimientos, en sus juegos.',
    'Manifestar disposición y confianza al separarse de los adultos significativos.',
    'Reconocer en sí mismo, en otras personas y en personajes de cuentos, emociones tales como: tristeza, miedo, alegría, pena y rabia.',
    'Manifestar disposición para regular sus emociones y sentimientos, en función de las necesidades propias, de los demás y de algunos acuerdos para el funcionamiento grupal.',
    'Manifestar sus preferencias cuando participa o cuando solicita participar, en diversas situaciones cotidianas y juegos.',
    'Actuar con progresiva independencia, ampliando su repertorio de acciones, acorde a sus necesidades e intereses.',
    'Comunicar algunos rasgos de su identidad, como su nombre, sus características corporales, género y otros.',
    'Apreciar sus características identitarias, fortalezas y habilidades.',
    'Manifestar progresiva independencia en sus prácticas de alimentación, vigilia y sueño, vestimenta, higiene corporal, bucal y evacuación.',
    'Manifestar satisfacción y confianza por su autovalía, comunicando algunos desafíos alcanzados, tales como: saltar, hacer torres, sacar cáscara de huevos, entre otros.',
    'Identificar alimentos que se consumen en algunas celebraciones propias de su familia y comunidad.',
    'Representar sus pensamientos y experiencias, atribuyendo significados a objetos o elementos de su entorno, usando la imaginación en situaciones de juego.',
  ]

  const OA_3 = [
    'Comunicar a los demás, emociones y sentimientos tales como: amor, miedo, alegría, ira, que le provocan diversas narraciones o situaciones observadas en forma directa o a través de TICs.',
    'Manifestar disposición y confianza para relacionarse con algunos adultos y pares que no son parte del grupo o curso.',
    'Reconocer emociones y sentimientos en otras personas, observadas en forma directa o a través de TICs.',
    'Expresar sus emociones y sentimientos autorregulándose en función de las necesidades propias, de los demás y las normas de funcionamiento grupal.',
    'Comunicar sus preferencias, opiniones, ideas, en diversas situaciones cotidianas y juegos.',
    'Planificar proyectos y juegos, en función de sus ideas e intereses, proponiendo actividades, organizando los recursos, incorporando los ajustes necesarios e iniciándose en la apreciación de sus resultados.',
    'Comunicar rasgos de su identidad de género, roles (nieta/o, vecino/a, entre otros), sentido de pertenencia y cualidades personales.',
    'Comunicar sus características identitarias, fortalezas, habilidades y desafíos personales.',
    'Cuidar su bienestar personal, llevando a cabo sus prácticas de higiene, alimentación y vestuario, con independencia y progresiva responsabilidad.',
    'Comunicar a otras personas desafíos alcanzados, identificando acciones que aportaron a su logro y definiendo nuevas metas.',
    'Distinguir parámetros establecidos para la regulación de alimentos, tales como: etiquetado de sellos, fechas de vencimiento, entre otros.',
    'Anticipar acciones y prever algunas situaciones o desafíos que se pueden presentar, en juegos, proyectos, sucesos que experimenta o que observa a través de TICs.',
    'Representar en juegos sociodramáticos, sus pensamientos y experiencias atribuyendo significados a objetos, personas y situaciones.',
  ]

  const oa1Promises = OA_1.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreA.id,
        },
      })
  )

  await Promise.all(oa1Promises)

  const oa2Promises = OA_2.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreA.id,
        },
      })
  )

  await Promise.all(oa2Promises)

  const oa3Promises = OA_3.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreA.id,
        },
      })
  )

  await Promise.all(oa3Promises)

  const OA_4 = [
    'Interactuar con pares y adultos significativos (a través de gestos y vocalizaciones, entre otros), en diferentes situaciones y juegos.',
    'Disfrutar de la cercanía de niños, niñas y adultos en juegos y situaciones cotidianas.',
    'Manifestar interés por lo que le sucede a otros niños y niñas, a través de acciones tales como: abrazar a quien está llorando, hacer cariños, entre otros.',
    'Manifestar interés por participar en celebraciones de su entorno significativo.',
    'Practicar algunas normas de convivencia, tales como: sentarse en su silla para almorzar, saludar, despedirse, y colaborar en acciones cotidianas.',
    'Manifestar disposición para responder positivamente o cambiar su comportamiento, frente a requerimientos del adulto, asociados a su seguridad y bienestar.',
  ]

  const OA_5 = [
    'Participar en actividades y juegos grupales con sus pares, conversando, intercambiando pertenencias, cooperando.',
    'Disfrutar de instancias de interacción social con diversas personas de la comunidad.',
    'Colaborar en situaciones cotidianas y de juego, proponiendo acciones simples frente a necesidades que presentan sus pares.',
    'Colaborar en actividades, conmemoraciones o celebraciones culturales de su familia y comunidad.',
    'Iniciarse en la resolución pacífica de conflictos, dialogando respecto de la situación, escuchando, opinando y proponiendo acciones para resolver.',
    'Manifestar disposición para practicar acuerdos de convivencia básica que regulan situaciones cotidianas y juegos.',
    'Identificar objetos, comportamientos y situaciones de riesgo que pueden atentar contra su seguridad, bienestar y el de los demás.',
    'Reconocer acciones correctas e incorrectas para la convivencia armónica del grupo, que se presentan en diferentes situaciones cotidianas y juegos.',
    'Manifestar interés por algunos de sus derechos, tales como: ser escuchados, tener un nombre, jugar, entre otros.',
    'Manifestar interés para interactuar con niños y niñas, reconociendo la diversidad de sus características y formas de vida (costumbres, fisonomía, lingüística, entre otras).',
  ]

  const OA_6 = [
    'Participar en actividades y juegos colaborativos, planificando, acordando estrategias para un propósito común y asumiendo progresivamente responsabilidades en ellos.',
    'Participar en actividades solidarias, que integran a las familias, la comunidad educativa y local.',
    'Manifestar empatía y solidaridad frente a situaciones que vivencian sus pares, o que observa en textos o TICs, practicando acciones de escucha, apoyo y colaboración.',
    'Apreciar el significado que tienen para las personas y las comunidades, diversas manifestaciones culturales que se desarrollan en su entorno.',
    'Aplicar estrategias pacíficas frente a la resolución de conflictos cotidianos con otros niños y niñas.',
    'Respetar normas y acuerdos creados colaborativamente con pares y adultos, para el bienestar del grupo.',
    'Identificar objetos, comportamientos y situaciones de riesgo que pueden atentar contra su bienestar y seguridad, o la de los demás, proponiendo alternativas para enfrentarlas.',
    'Comprender que algunas de sus acciones y decisiones respecto al desarrollo de juegos y proyectos colectivos, influyen en las de sus pares.',
    'Reconocer, y progresivamente hacer respetar el derecho a expresarse libremente, a ser escuchado y a que su opinión sea tomada en cuenta.',
    'Reconocer progresivamente requerimientos esenciales de las prácticas de convivencia democrática, tales como: escucha de opiniones divergentes, el respeto por los demás, de los turnos, de los acuerdos de las mayorías.',
    'Apreciar la diversidad de las personas y sus formas de vida, tales como: singularidades fisonómicas, lingüísticas, religiosas, de género, entre otras.',
  ]

  const oa4Promises = OA_4.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreB.id,
        },
      })
  )

  await Promise.all(oa4Promises)
  const oa5Promises = OA_5.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreB.id,
        },
      })
  )

  await Promise.all(oa5Promises)

  const oa6Promises = OA_6.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreB.id,
        },
      })
  )

  await Promise.all(oa6Promises)

  const OA_7 = [
    'Manifestar su agrado, al sentirse cómodo, seguro y contenido corporalmente.',
    'Descubrir partes de su cuerpo y algunas de sus características físicas, a través de diversas experiencias sensoriomotrices.',
    'Manifestar interés y satisfacción al moverse libremente en situaciones cotidianas y lúdicas.',
    'Ampliar sus posibilidades de exploración sensoriomotriz, adquiriendo control de la prensión palmar voluntaria (toma objetos, se pasa objetos de una mano a otra, entre otros) y la postura sedente.',
    'Adquirir desplazamiento gradual en sus distintas formas (girar, reptar, ponerse de pie, caminar), para disfrutar la ampliación de sus posibilidades de movimiento, exploración y juego.',
    'Coordinar movimientos de manipulación ubicando objetos en relación a su propio cuerpo, tales como: acercar objetos pequeños utilizando índice y pulgar en oposición.',
    'Explorar la alternancia de posturas y movimientos en acciones tales como: trepar, lanzar objetos o hacer ronda, adquiriendo control gradual de su cuerpo al jugar.',
  ]

  const OA_8 = [
    'Reconocer situaciones en que se siente cómodo corporalmente, manifestando al adulto su bienestar y su interés por mantener estas condiciones.',
    'Reconocer las principales partes, características físicas de su cuerpo y sus funciones en situaciones cotidianas y de juego.',
    'Experimentar diversas posibilidades de acción con su cuerpo, en situaciones cotidianas y de juego, identificando progresivamente el vocabulario asociado.',
    'Reconocer el bienestar que le produce el movimiento libre en situaciones cotidianas y lúdicas, manifestando su interés por desarrollarlo en forma frecuente.',
    'Perfeccionar su coordinación visomotriz fina, a través del uso de diversos objetos, juguetes y utensilios.',
    'Adquirir control y equilibrio en movimientos, posturas y desplazamientos que realiza en diferentes direcciones y en variadas situaciones cotidianas y juegos, con y sin implementos.',
    'Resolver desafíos prácticos en situaciones cotidianas y juegos, incorporando mayor precisión y coordinación en la realización de posturas, movimientos y desplazamientos, tales como: esquivar obstáculos o mantener equilibrio al subir escalas.',
    'Utilizar categorías de ubicación espacial y temporal, tales como: adelante/atrás, arriba/abajo, adentro/afuera, antes/ después, rápido/lento, en situaciones cotidianas y lúdicas.',
  ]

  const OA_9 = [
    'Manifestar iniciativa para resguardar el autocuidado de su cuerpo y su confortabilidad, en función de su propio bienestar.',
    'Apreciar sus características corporales, manifestando interés y cuidado por su bienestar y apariencia personal.',
    'Tomar conciencia de su cuerpo, de algunas de sus características internas (tales como: ritmo cardíaco, de respiración), de su esquema y progresivamente de su tono corporal y lateralidad, por medio de juegos.',
    'Comunicar nuevas posibilidades de acción logradas a través de su cuerpo en situaciones cotidianas y de juego, empleando vocabulario preciso',
    'Comunicar el bienestar que le produce el movimiento, al ejercitar y recrear su cuerpo en forma habitual, con y sin implementos u obstáculos.',
    'Coordinar con precisión y eficiencia sus habilidades psicomotrices finas en función de sus intereses de exploración y juego.',
    'Resolver desafíos prácticos manteniendo control, equilibrio y coordinación al combinar diversos movimientos, posturas y desplazamientos tales como: lanzar y recibir, desplazarse en planos inclinados, seguir ritmos, en una variedad de juegos.',
    'Coordinar sus habilidades psicomotoras practicando posturas y movimientos de fuerza, resistencia y tracción tales como: tirar la cuerda, transportar objetos, utilizar implementos, en situaciones cotidianas y de juego.',
    'Utilizar categorías de ubicación espacial y temporal, tales como: adelante/atrás/al lado/entre, día/noche, hoy/ mañana, antes/durante/después, en situaciones cotidianas y lúdicas',
  ]

  const oa7Promises = OA_7.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreC.id,
        },
      })
  )

  await Promise.all(oa7Promises)

  const oa8Promises = OA_8.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreC.id,
        },
      })
  )

  await Promise.all(oa8Promises)

  const oa9Promises = OA_9.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreC.id,
        },
      })
  )

  await Promise.all(oa9Promises)

  const OA_10 = [
    'Expresar oralmente sus emociones y necesidades, a través de balbuceos, vocalizaciones y diversos recursos gestuales.',
    'Expresar oralmente sus necesidades e intereses, mediante la combinación de palabras y gestos, el uso de palabra-frase y progresivamente el empleo de frases simples.',
    'Identificar progresivamente la intención comunicativa de las distintas personas de su entorno a partir de sus expresiones verbales, no verbales y paraverbales.',
    'Comprender mensajes simples y breves en juegos y situaciones comunicativas cotidianas, respondiendo en forma gestual y corporal.',
    'Reconocer sonidos de diferentes fuentes sonoras de su entorno cotidiano, tales como objetos, artefactos, instrumentos musicales, animales, naturaleza.',
    'Incorporar nuevas palabras a su repertorio lingüístico para comunicarse con otros, en juegos y conversaciones.',
    'Disfrutar de distintos textos gráficos (libros de cuentos, láminas, entre otros) al manipularlos y observar sus imágenes.',
    'Comprender progresivamente, a partir de la escucha atenta, algunos contenidos explícitos de textos literarios y no literarios, respondiendo preguntas simples, en forma oral o gestual (¿qué es?, ¿quién es?, ¿dónde está?).',
  ]

  const OA_11 = [
    'Expresarse oralmente, empleando estructuras oracionales simples y respetando patrones gramaticales básicos, en distintas situaciones cotidianas y juegos.',
    'Comprender mensajes simples como instrucciones explícitas, explicaciones y preguntas relativas a objetos, personas, acciones, tiempo y lugar, identificando la intencionalidad comunicativa de diversos interlocutores.',
    'Identificar algunos atributos de los sonidos de diferentes fuentes sonoras como intensidad (fuerte/suave), velocidad (rápido/lento).',
    'Incorporar progresivamente nuevas palabras, al comunicar oralmente temas variados de su interés e información básica, en distintas situaciones cotidianas.',
    'Manifestar interés por descubrir el contenido de textos de diferentes formatos, a través de la manipulación, la exploración, la escucha atenta y la formulación de preguntas.',
    'Comprender a partir de la escucha atenta, contenidos explícitos de textos literarios y no literarios, reconociendo ideas centrales, señalando preferencias, realizando sencillas descripciones, preguntando sobre el contenido.',
    'Reconocer progresivamente el significado de diversas imágenes, logos, símbolos de su entorno cotidiano, en diversos soportes (incluye uso de TICs).',
    'Producir sus propios signos gráficos en situaciones lúdicas.',
  ]

  const OA_12 = [
    'Expresarse oralmente en forma clara y comprensible, empleando estructuras oracionales completas, conjugaciones verbales adecuadas y precisas con los tiempos, personas e intenciones comunicativas.',
    'Comprender textos orales como preguntas, explicaciones, relatos, instrucciones y algunos conceptos abstractos en distintas situaciones comunicativas, identificando la intencionalidad comunicativa de diversos interlocutores.',
    'Descubrir en contextos lúdicos, atributos fonológicos de palabras conocidas, tales como conteo de palabras, segmentación y conteo de sílabas, identificación de sonidos finales e iniciales.',
    'Comunicar oralmente temas de su interés, empleando un vocabulario variado e incorporando palabras nuevas y pertinentes a las distintas situaciones comunicativas e interlocutores.',
    'Manifestar interés por descubrir el contenido y algunos propósitos de diferentes textos escritos (manipulando, explorando, realizando descripciones y conjeturas) a través del contacto cotidiano con algunos de ellos, o del uso de TICs.',
    'Comprender contenidos explícitos de textos literarios y no literarios, a partir de la escucha atenta, describiendo información y realizando progresivamente inferencias y predicciones.',
    'Reconocer palabras que se encuentran en diversos soportes asociando algunos fonemas a sus correspondientes grafemas.',
    'Representar gráficamente algunos trazos, letras, signos, palabras significativas y mensajes simples legibles, utilizando diferentes recursos y soportes en situaciones auténticas.',
    'Comunicar mensajes simples en la lengua indígena pertinente a la comunidad donde habita.',
    'Reconocer algunas palabras o mensajes sencillos de lenguas maternas de sus pares, distintas al castellano.',
  ]

  const oa10Promises = OA_10.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreD.id,
        },
      })
  )

  await Promise.all(oa10Promises)

  const oa11Promises = OA_11.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreD.id,
        },
      })
  )

  await Promise.all(oa11Promises)

  const oa12Promises = OA_12.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreD.id,
        },
      })
  )

  await Promise.all(oa12Promises)

  const OA_13 = [
    'Manifestar interés por los sonidos, las texturas, los colores y la luminosidad de su entorno, respondiendo a través de diversas formas, tales como balbuceo, gestos, sonrisas, entre otros.',
    'Producir sonidos con su voz, su cuerpo y diversos objetos sonoros, en forma espontánea o por imitación.',
    'Imitar gestos, movimientos, sonidos de su entorno significativo, a través de diversos medios.',
    'Manifestar sus preferencias por recursos expresivos presentes en piezas musicales, visuales, y escénicas, a través de gestos, movimientos, palabras, entre otros.',
    'Expresar corporalmente las emociones y sensaciones que le provocan algunas piezas musicales, bailando, cantando e intentando seguir el ritmo.',
    'Experimentar sus posibilidades de expresión plástica a través de diversos recursos, produciendo sus primeros garabateos espontáneos.',
  ]

  const OA_14 = [
    'Manifestar interés por diversas producciones artísticas (arquitectura, modelado, piezas musicales, pintura, dibujos, títeres, obras de teatro, danzas, entre otras), describiendo algunas características.',
    'Expresar sus preferencias, sensaciones y emociones relacionadas con diferentes recursos expresivos que se encuentran en sencillas obras visuales (colorido, formas), musicales (fuente, intensidad del sonido) o escénicas (desplazamiento, vestimenta, carácter expresivo).',
    'Interpretar canciones y juegos musicales, experimentando con diversos recursos tales como, la voz, el cuerpo, instrumentos musicales y objetos.',
    'Expresar corporalmente sensaciones y emociones experimentando con mímica, juegos teatrales, rondas, bailes y danzas.',
    'Expresar emociones, ideas y experiencias por medio de la plástica experimentando con recursos pictóricos, gráficos y de modelado.',
    'Experimentar diversas posibilidades de expresión, combinando lenguajes artísticos en sus producciones.',
    'Representar a través del dibujo, diversos elementos de su entorno, incorporando figuras cerradas, trazos intencionados y primeros esbozos de la figura humana.',
  ]

  const OA_15 = [
    'Apreciar producciones artísticas de diversos contextos (en forma directa o a través de medios tecnológicos), describiendo y comparando algunas características visuales, musicales o escénicas (desplazamiento, ritmo, carácter expresivo, colorido, formas, diseño, entre otros).',
    'Comunicar sus impresiones, emociones e ideas respecto de diversas obras de arte, producciones propias y de sus pares (artesanías, piezas musicales, obras plásticas y escénicas, entre otras).',
    'Interpretar canciones y juegos musicales, utilizando de manera integrada diversos recursos tales como, la voz, el cuerpo, instrumentos musicales y objetos.',
    'Expresar corporalmente sensaciones, emociones e ideas a partir de la improvisación de escenas dramáticas, juegos teatrales, mímica y danza.',
    'Representar plásticamente emociones, ideas, experiencias e intereses, a través de líneas, formas, colores, texturas, con recursos y soportes en plano y volumen.',
    'Experimentar diversas combinaciones de expresión plástica, corporal y musical, comunicando las razones del proceso realizado.',
    'Representar a través del dibujo, sus ideas, intereses y experiencias, incorporando detalles a las figuras humanas y a objetos de su entorno, ubicándolos en parámetros básicos de organización espacial (arriba/abajo, dentro/fuera).',
  ]

  const oa13Promises = OA_13.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreE.id,
        },
      })
  )

  await Promise.all(oa13Promises)

  const oa14Promises = OA_14.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreE.id,
        },
      })
  )

  await Promise.all(oa14Promises)

  const oa15Promises = OA_15.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreE.id,
        },
      })
  )

  await Promise.all(oa15Promises)

  const OA_16 = [
    'Manifestar curiosidad y asombro por algunos elementos, situaciones y fenómenos que ocurren en su entorno natural cercano, tales como: arena, lluvia, viento, entre otros.',
    'Reconocer algunos elementos representativos de su entorno natural, tales como: animales, plantas, ríos, cerros, desierto.',
    'Explorar su entorno, observando, manipulando y experimentando con diversos materiales de su interés, tales como: mezclar agua con tierra, recoger hojas o ramas, trasladar piedras, hacer huellas.',
    'Descubrir características de animales al observarlos en forma directa, en textos y en imágenes.',
    'Colaborar en actividades sencillas de cuidado de la naturaleza, tales como: regar, recoger hojas, trasladar ramitas, entre otras.',
  ]

  const OA_17 = [
    'Manifestar interés y asombro por diversos elementos, situaciones y fenómenos del entorno natural, explorando, observando, preguntando, describiendo, agrupando, entre otros.',
    'Comunicar verbalmente características de elementos y paisajes de su entorno natural, tales como cuerpos celestes, cerros, desierto, flora; y de fenómenos como marejadas, sismos, tormentas, sequías.',
    'Descubrir que el sol es fuente de luz y calor para el planeta, a través de experiencias directas o TICs.',
    'Comunicar algunas propiedades básicas de los elementos naturales que explora, tales como: colores, texturas, tamaños, temperaturas entre otras.',
    'Distinguir una variedad progresivamente más amplia de animales y plantas, respecto a sus características (tamaño, color, textura y morfología), sus necesidades básicas y los lugares que habitan, al observarlos en forma directa, en libros ilustrados o en TICs.',
    'Colaborar en situaciones cotidianas, en acciones que contribuyen al desarrollo de ambientes sostenibles, tales como cerrar las llaves de agua, apagar aparatos eléctricos, entre otras.',
    'Emplear instrumentos y herramientas de observación y recolección (lupas, frascos, recipientes, botellas, cucharas, embudos, pinzas, entre otros) en la exploración del entorno natural.',
    'Experimentar mezclas y disoluciones con materiales cotidianos tales como: burbujas de jabón, agua salada, gelatina, describiendo los cambios observados.',
    'Reconocer que el aire y el agua son elementos vitales para las personas, los animales y las plantas, y que estos elementos pueden encontrarse con o sin contaminación.',
  ]

  const OA_18 = [
    'Manifestar interés y asombro al ampliar información sobre cambios que ocurren en el entorno natural, a las personas, animales, plantas, lugares y cuerpos celestes, utilizando diversas fuentes y procedimientos.',
    'Formular conjeturas y predicciones acerca de las causas o consecuencias de fenómenos naturales que observa, a partir de sus conocimientos y experiencias previas.',
    'Reconocer la importancia del agua y la energía solar para la vida humana, los animales y las plantas, a partir de experiencias directas o TICs.',
    'Comunicar propiedades básicas de los objetos y elementos naturales que explora, tales como: transparencia/opacidad, flexibilidad/rigidez, rugosidad/lisura, relacionándolos con posibles usos.',
    'Explorar los cambios o efectos que se producen en los materiales al aplicarles fuerza, calor o agua.',
    'Establecer relaciones de semejanzas y diferencias de animales y plantas, a partir de algunas características (tamaño, color, textura y morfología), sus necesidades básicas (formas de alimentación y abrigo), y los lugares que habitan, al observarlos en forma directa, en libros ilustrados o en TICs.',
    'Describir semejanzas y diferencias respecto a características, necesidades básicas y cambios que ocurren en el proceso de crecimiento, en personas, animales y plantas.',
    'Practicar algunas acciones cotidianas, que contribuyen al cuidado de ambientes sostenibles, tales como manejo de desechos en paseos al aire libre, separación de residuos, utilizar envases o papeles, plantar flores o árboles.',
    'Comunicar sus observaciones, los instrumentos utilizados y los hallazgos obtenidos en experiencias de indagación en el entorno natural, mediante relatos, representaciones gráficas o fotografías.',
    'Formular conjeturas a partir de los cambios observados en mezclas y disoluciones, estableciendo relaciones de posible causalidad y comunicándolas a través de diferentes medios.',
    'Identificar las condiciones que caracterizan los ambientes saludables, tales como: aire y agua limpia, combustión natural, reciclaje, reutilización y reducción de basura, tomando conciencia progresiva de cómo estas contribuyen a su salud.',
    'Comprender que la acción humana puede aportar al desarrollo de ambientes sostenibles y también al deterioro de estos.',
  ]

  const oa16Promises = OA_16.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreF.id,
        },
      })
  )

  await Promise.all(oa16Promises)

  const oa17Promises = OA_17.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreF.id,
        },
      })
  )

  await Promise.all(oa17Promises)

  const oa18Promises = OA_18.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreF.id,
        },
      })
  )

  await Promise.all(oa18Promises)

  const OA_19 = [
    'Imitar gestos y acciones que realizan personas de su entorno cercano.',
    'Identificar algunas actividades habituales que se realizan en su vida cotidiana, tales como: preparación de alimentos, rutinas antes de dormir, entre otras.',
    'Manifestar interés por canciones, juegos y bailes que forman parte de su cotidianeidad.',
    'Explorar utensilios domésticos y objetos tecnológicos que forman parte de su vida cotidiana, tales como: pocillos, envases de botellas, escobas, cucharas, teléfonos, entre otros, utilizándolos progresivamente en situaciones cotidianas y juegos.',
    'Reconocer objetos y personas, asociándolos a ciertos lugares, tales como: educadora/ técnico y jardín infantil; mamá/papá y casa; cama y dormir, recinto de cocina y comida, de su entorno sociocultural.',
  ]

  const OA_20 = [
    'Describir actividades habituales de su comunidad, como ir de compras, jugar en la plaza, viajar en bus, entre otras, señalando su participación en ellas.',
    'Describir características de las formas de vida de su comunidad (viviendas, paisajes, costumbres), a través de canciones, juegos, relatos y fotos familiares, entre otras.',
    'Seleccionar utensilios domésticos y objetos tecnológicos que les permiten resolver problemas en contextos sociales auténticos.',
    'Reconocer sucesos significativos de su historia personal y familiar, en diversas situaciones, tales como: conversaciones familiares, relatos de un agente comunitario, visitas a lugares, observación de fotografías, entre otros.',
    'Identificar instituciones significativas de su entorno, describiendo actividades y rutinas representativas que en ellas se realizan.',
    'Identificar algunas normas de protección y seguridad de su entorno cotidiano referidas a alimentación, tránsito y sismos, y otras pertinentes a su contexto geográfico.',
    'Distinguir en paisajes de su localidad, elementos naturales (bosque, cerros, ríos), y culturales (caminos, edificios, puentes).',
  ]

  const OA_21 = [
    'Comprender los roles que desarrollan miembros de su familia y de su comunidad, y su aporte para el bienestar común.',
    'Apreciar diversas formas de vida de comunidades, del país y del mundo, en el pasado y en el presente, tales como: viviendas, paisajes, alimentación, costumbres, identificando mediante diversas fuentes de documentación gráfica y audiovisual, sus características relevantes.',
    'Comparar características de diseño, funcionamiento, utilidad, precaución de uso e impacto en el entorno, de diferentes objetos tecnológicos.',
    'Formular interpretaciones respecto de las necesidades y situaciones que dieron origen a creaciones e inventos, tales como: refrigerador, radio, avión, naves espaciales, cámara fotográfica, entre otros.',
    'Comunicar algunos relatos sociales sobre hechos significativos del pasado de su comunidad y país, apoyándose en recursos tales como: fotografías, videos, utensilios u objetos representativos.',
    'Reconocer diversas acciones para el cuidado del patrimonio cultural material (construcciones, obras de carácter arqueológico, lugares) e inmaterial (tradiciones, celebraciones), de su comunidad local.',
    'Reconocer la importancia del servicio que prestan instituciones, organizaciones, lugares y obras de interés patrimonial, tales como: escuelas, transporte público, empresas, iglesias, museos, bibliotecas, entre otros.',
    'Conocer sobre la vida de algunas mujeres y hombres, que han realizado en el pasado y en el presente, aportes diversos en su comunidad, país, y el mundo, a través de relatos, o con apoyo de TICs.',
    'Ampliar sus estrategias de indagación utilizando diversas fuentes, instrumentos y tecnologías de la información y comunicación, que le permitan expandir su entorno.',
    'Comprender normas de protección y seguridad referidas a tránsito, incendios, inundaciones, sismos, y otras pertinentes a su contexto geográfico.',
    'Identificar lugares de su entorno a través de su representación geográfica, tales como: maquetas, fotografías aéreas, dibujos y planos.',
  ]

  const oa19Promises = OA_19.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreG.id,
        },
      })
  )

  await Promise.all(oa19Promises)

  const oa20Promises = OA_20.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreG.id,
        },
      })
  )

  await Promise.all(oa20Promises)

  const oa21Promises = OA_21.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreG.id,
        },
      })
  )

  await Promise.all(oa21Promises)

  const OA_22 = [
    'Adquirir la noción de permanencia de objetos y de personas significativas, mediante juegos con diversos objetos de uso cotidiano.',
    'Explorar a través de sus experiencias sensoriales y motrices, atributos de los objetos tales como: tamaño, textura y dureza.',
    'Experimentar con los objetos, resolviendo situaciones concretas, tales como: alcanzar objetos, apretar botones en aparatos sonoros, sacar juguetes de contenedores, juntar objetos, entre otros.',
    'Utilizar en situaciones lúdicas, nociones de ubicación en relación con su propio cuerpo tales como: dentro/fuera; encima/debajo.',
    'Orientarse temporalmente en situaciones cotidianas, siguiendo secuencias breves tales como: antes/después.',
    'Emplear cuantificadores (más/menos, mucho/poco), en situaciones cotidianas.',
  ]

  const OA_23 = [
    'Reproducir patrones sonoros, visuales, gestuales, corporales u otros, de dos o tres elementos.',
    'Experimentar con diversos objetos, estableciendo relaciones al clasificar por dos atributos a la vez (forma, color, entre otros) y seriar por altura o longitud.',
    'Describir la posición de objetos y personas, respecto de un punto u objeto de referencia, empleando conceptos de ubicación y distancia tales como: dentro/fuera; encima/debajo; cerca /lejos.',
    'Orientarse temporalmente en situaciones cotidianas, mediante la utilización progresiva de algunas nociones y relaciones de secuencias, tales como: antes/ después, día/noche, hoy/mañana.',
    'Emplear cuantificadores, tales como: más/menos, mucho/poco, todo/ninguno, al comparar cantidades de objetos en situaciones cotidianas.',
    'Emplear progresivamente los números, para contar, identificar, cuantificar y comparar cantidades, hasta el 10 e indicar orden o posición de algunos elementos en situaciones cotidianas o juegos.',
    'Representar progresivamente, números y cantidades en forma concreta y pictórica hasta el 10.',
    'Resolver progresivamente problemas simples, de manera concreta y pictórica, agregando o quitando hasta 5 elementos.',
    'Descubrir atributos de figuras 3D, mediante la exploración de objetos presentes en su entorno.',
    'Identificar algunas acciones que se llevaron a cabo para resolver problemas.',
  ]

  const OA_24 = [
    'Crear patrones sonoros, visuales, gestuales, corporales u otros, de dos o tres elementos.',
    'Experimentar con diversos objetos estableciendo relaciones al clasificar por dos o tres atributos a la vez (forma, color, tamaño, función, masa, materialidad, entre otros) y seriar por altura, ancho, longitud o capacidad para contener.',
    'Comunicar la posición de objetos y personas respecto de un punto u objeto de referencia, empleando conceptos de ubicación (dentro/fuera; encima/debajo/entre; al frente de/detrás de); distancia (cerca/lejos) y dirección (adelante/atrás/hacia el lado), en situaciones lúdicas.',
    'Emplear cuantificadores, tales como: “más que”, “menos que”, “igual que”, al comparar cantidades de objetos en situaciones cotidianas.',
    'Orientarse temporalmente en situaciones cotidianas, empleando nociones y relaciones de secuencia (antes/ahora/después/al mismo tiempo, día/noche), frecuencia (siempre/a veces/ nunca) y duración (larga/corta).',
    'Emplear los números, para contar, identificar, cuantificar y comparar cantidades hasta el 20 e indicar orden o posición de algunos elementos en situaciones cotidianas o juegos.',
    'Representar números y cantidades hasta el 10, en forma concreta, pictórica y simbólica.',
    'Resolver problemas simples de manera concreta y pictórica agregando o quitando hasta 10 elementos, comunicando las acciones llevadas a cabo.',
    'Representar objetos desde arriba, del lado, abajo, a través de dibujos, fotografías o TICs, formulando conjeturas frente a sus descubrimientos.',
    'Identificar atributos de figuras 2D y 3D, tales como: forma, cantidad de lados, vértices, caras, que observa en forma directa o a través de TICs.',
    'Emplear medidas no estandarizadas, para determinar longitud de objetos, registrando datos, en diversas situaciones lúdicas o actividades cotidianas.',
    'Comunicar el proceso desarrollado en la resolución de problemas concretos, identificando la pregunta, acciones y posibles respuestas.',
  ]

  const oa22Promises = OA_22.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 1,
          parentCoreId: coreH.id,
        },
      })
  )

  await Promise.all(oa22Promises)

  const oa23Promises = OA_23.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 2,
          parentCoreId: coreH.id,
        },
      })
  )

  await Promise.all(oa23Promises)

  const oa24Promises = OA_24.map(
    async (item) =>
      await prisma.objective.create({
        data: {
          description: item,
          level: 3,
          parentCoreId: coreH.id,
        },
      })
  )

  await Promise.all(oa24Promises)
}
