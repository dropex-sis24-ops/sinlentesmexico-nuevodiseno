/* ===========================================================================
   Idiomas (ES · EN) — Sinlentesmexico
   ---------------------------------------------------------------------------
   El sitio se dibuja desde landing.js / test.js con el texto en español
   escrito directo en las plantillas. Reescribir esos archivos para meterles
   claves de traducción sería tocar 136 KB de código de otro desarrollador.
   En vez de eso, esta capa traduce el DOM ya pintado: recorre los nodos de
   texto y los atributos visibles y los cambia según el diccionario.

   Ventajas: landing.js y test.js quedan intactos, y volver a español es
   restaurar el original que guardamos por nodo.

   ADVERTENCIA: el inglés de abajo es una TRADUCCIÓN DE TRABAJO. Son textos
   médicos, precios y meses sin intereses de una clínica real. Antes de
   publicar, la clínica tiene que revisarlos y aprobarlos.
   =========================================================================== */
(function () {
  'use strict';

  var DIC = {
  /* --- Barra, navegación y pie --- */
  'Procedimientos': 'Procedures',
  'Compara': 'Compare',
  'Sedes': 'Locations',
  'Cómo funciona': 'How it works',
  'Únete al equipo': 'Join the team',
  'Preguntas': 'Questions',
  'Menú': 'Menu',
  'Ver el simulador': 'Open the simulator',
  'Hacer el test': 'Take the test',
  'Login': 'Log in',
  'Principal': 'Main',
  'Iniciar sesión': 'Log in',
  'Acceso interno': 'Internal access',
  'Contacto': 'Contact',
  'Información': 'Information',
  'Aviso de privacidad': 'Privacy notice',
  'Términos y condiciones': 'Terms and conditions',
  'Programa de aliados': 'Partner program',
  'Test de candidatura': 'Candidacy test',
  'Procedimientos refractivos láser e implante de lente intraocular en cinco ciudades de México.': 'Laser refractive procedures and intraocular lens implants in five cities across Mexico.',
  'Responsable Sanitario: Dr. Edgar Antonio Solano Tego — Cédula Prof. 2013102 · Esp. 4010390 (UNAM). Los procedimientos descritos requieren estudios y diagnóstico médico previos. Los resultados varían según cada paciente y ninguna información de este sitio constituye diagnóstico, indicación ni promesa de resultado.': 'Medical Director: Dr. Edgar Antonio Solano Tego — Professional licence 2013102 · Specialty 4010390 (UNAM). The procedures described require prior testing and a medical diagnosis. Results vary from patient to patient, and nothing on this site constitutes a diagnosis, a medical indication or a promise of any outcome.',
  '© 2026 SINLENTESMEXICO GRUPO EMPRESARIAL S DE R.L. DE C.V. Todos los derechos reservados.': '© 2026 SINLENTESMEXICO GRUPO EMPRESARIAL S DE R.L. DE C.V. All rights reserved.',

  /* --- Portada --- */
  'Agenda disponible esta semana en 5 ciudades': 'Appointments available this week in 5 cities',
  'Deja de depender de tus lentes': 'Stop depending on your glasses',
  'Responde 4 preguntas y descubre qué procedimiento se acerca más a tu caso. Al terminar eliges cómo avanzar: una videollamada sin costo con un oftalmólogo, o agendar directo tus estudios preoperatorios.': 'Answer 4 questions and find out which procedure comes closest to your case. At the end you choose how to move forward: a free video call with an ophthalmologist, or booking your pre-operative tests directly.',
  'Hacer el test · 4 preguntas': 'Take the test · 4 questions',
  '¿Prefieres hablar?': 'Would you rather talk?',
  'Escríbenos por WhatsApp': 'Message us on WhatsApp',
  'Qué es Sinlentesmexico y cómo trabajamos': 'What Sinlentesmexico is and how we work',
  'COFEPRIS': 'COFEPRIS',
  'Autorización sanitaria 2507015036X00028': 'Health authorisation 2507015036X00028',
  'Cédula validada': 'Verified licence',
  'Oftalmólogos certificados ante la SEP': 'Ophthalmologists certified with the SEP',
  'Ciudades con agenda activa': 'Cities with an active schedule',
  'Procedimientos realizados': 'Procedures performed',
  'Textos por validar': 'Texts pending approval',

  /* --- Recorrido del ojo --- */
  'Cómo funciona tu ojo': 'How your eye works',
  'Así enfoca tu ojo': 'This is how your eye focuses',
  'Baja para ver qué corrige cada procedimiento.': 'Scroll down to see what each procedure corrects.',
  'Anatomía': 'Anatomy',
  'Cuatro capas, un solo enfoque': 'Four layers, a single focus',
  'Córnea, iris, cristalino y retina trabajan juntos para que la imagen llegue nítida.': 'Cornea, iris, lens and retina work together so the image arrives sharp.',
  'Miopía': 'Myopia',
  'La luz enfoca antes de la retina': 'Light focuses in front of the retina',
  'Por eso lo lejano se ve borroso: letreros, manejar, la calle.': 'That is why distance looks blurry: signs, driving, the street.',
  'Astigmatismo': 'Astigmatism',
  'La córnea no es pareja': 'The cornea is not even',
  'Su curvatura irregular reparte la luz en dos focos y la imagen se deforma.': 'Its irregular curvature splits light into two focal points and the image is distorted.',
  'Procedimiento Láser · 18 a 40 años': 'Laser Procedure · ages 18 to 40',
  'El láser remodela la córnea': 'The laser reshapes the cornea',
  'Corrige miopía, hipermetropía y astigmatismo remodelando la córnea. Ambulatorio, alrededor de 20 minutos.': 'Corrects myopia, hyperopia and astigmatism by reshaping the cornea. Outpatient, about 20 minutes.',
  'ambos ojos · 3 × $10,000 · 6 × $5,000': 'both eyes · 3 × $10,000 · 6 × $5,000',
  'Presbilens · 40 años o más': 'Presbilens · age 40 and over',
  'Vista cansada: se sustituye el cristalino': 'Presbyopia: the natural lens is replaced',
  'El láser no corrige la vista cansada. Presbilens sustituye el cristalino por un lente intraocular y además atiende la vista cansada.': 'The laser does not correct presbyopia. Presbilens replaces the natural lens with an intraocular lens and also addresses presbyopia.',
  'Presbilens Esencial · ambos ojos · hasta 12 MSI': 'Presbilens Essential · both eyes · up to 12 interest-free monthly payments',
  'Tu caso': 'Your case',
  '¿Cuál es tu camino?': 'Which path is yours?',
  'Responde 4 preguntas y descubre qué procedimiento se acerca más a tu caso.': 'Answer 4 questions and find out which procedure comes closest to your case.',
  'Sin lentes': 'No glasses',
  'Despídete de depender de tus lentes.': 'Say goodbye to depending on your glasses.',
  'Un procedimiento de minutos para recuperar tu libertad visual.': 'A procedure that takes minutes to give you back your visual freedom.',
  'Ojo': 'Eye',
  'Capas': 'Layers',
  'Láser': 'Laser',
  'Presbilens': 'Presbilens',
  'Arrastra para girar · Baja para avanzar': 'Drag to rotate · Scroll to continue',
  'Precio todo incluido: estudios, procedimiento, medicamento y seguimiento a doce meses.': 'All-inclusive price: tests, procedure, medication and twelve months of follow-up.',
  'Oftalmólogos con cédula profesional validada ante la SEP.': 'Ophthalmologists whose professional licence is verified with the SEP.',
  'Hablas con un oftalmólogo por videollamada antes de gastar un peso.': 'You speak with an ophthalmologist by video call before spending a single peso.',

  /* --- Test incrustado y test.html --- */
  'Pregunta 1 de 4': 'Question 1 of 4',
  'Pregunta': 'Question',
  'de 4': 'of 4',
  '¿Cuántos años tienes?': 'How old are you?',
  'La edad define si la ruta es láser o lente intraocular.': 'Age determines whether the path is laser or an intraocular lens.',
  'Sin registro · Sin tarjeta · Resultado en un minuto': 'No sign-up · No card · Result in one minute',
  'Sin costo · Sin registro': 'Free · No sign-up',
  '18 a 39 años': 'Ages 18 to 39',
  'La etapa donde el láser suele ser la mejor opción': 'The stage where the laser is usually the best option',
  '40 a 49 años': 'Ages 40 to 49',
  'Aquí empieza la vista cansada': 'This is where presbyopia begins',
  '50 a 59 años': 'Ages 50 to 59',
  'Etapa habitual del lente intraocular': 'The usual stage for an intraocular lens',
  '60 años o más': 'Age 60 and over',
  'Se evalúa también la salud del cristalino': 'The health of the natural lens is also assessed',
  'Soy menor de 18 años': 'I am under 18',
  'Edad': 'Age',
  'Lo que más te cuesta': 'What you struggle with most',
  '¿Qué es lo que más trabajo te cuesta hoy?': 'What do you struggle with most today?',
  'Elige lo que más te limita en tu día, no lo único.': 'Choose what limits you most in your day, not the only thing.',
  'Ver de lejos': 'Seeing far away',
  'Letreros, manejar, la calle': 'Signs, driving, the street',
  'Ver de cerca': 'Seeing up close',
  'El celular, el menú, leer': 'Your phone, the menu, reading',
  'Las dos cosas': 'Both',
  'Cambio de lentes según la distancia': 'I switch glasses depending on the distance',
  'Ver de noche': 'Seeing at night',
  'Reflejos, halos, deslumbramiento': 'Glare, halos, dazzle',
  'Tu día a día': 'Your daily life',
  '¿Cómo es tu día a día?': 'What is your daily life like?',
  'Determina qué distancias necesitas realmente cubrir.': 'This determines which distances you really need covered.',
  'Pantallas todo el día': 'Screens all day',
  'Computadora, celular, oficina': 'Computer, phone, office',
  'Manejo mucho de noche': 'I drive a lot at night',
  'Carretera, turnos, traslados': 'Highway, shift work, commuting',
  'Deporte y aire libre': 'Sport and the outdoors',
  'Actividad física, exteriores': 'Physical activity, outdoors',
  'Lectura y trabajo de detalle': 'Reading and detailed work',
  'Documentos, manualidades, precisión': 'Documents, crafts, precision',
  'Lo que esperas': 'What you expect',
  '¿Qué esperas del resultado?': 'What do you expect from the result?',
  'No hay respuesta correcta. Sirve para no ofrecerte de más ni de menos.': 'There is no right answer. It keeps us from offering you too much or too little.',
  'Resolver lo esencial': 'Solve the essentials',
  'No me molesta usar lentes para leer': 'I do not mind wearing glasses to read',
  'Depender lo menos posible': 'Depend on glasses as little as possible',
  'Quiero cubrir la mayoría de mis actividades': 'I want to cover most of my activities',
  'La mayor independencia posible': 'The greatest possible independence',
  'Quiero cubrir todas las distancias': 'I want every distance covered',
  'Quiero que me orienten': 'I want guidance',
  'Prefiero que el especialista me diga': 'I would rather the specialist tell me',
  'Tu perfil': 'Your profile',
  'Responsable Sanitario: Dr. Edgar Antonio Solano Tego — Cédula Prof. 2013102 · Esp. 4010390 (UNAM). COFEPRIS 2507015036X00028. Este test es orientativo y no sustituye los estudios ni el diagnóstico médico.': 'Medical Director: Dr. Edgar Antonio Solano Tego — Professional licence 2013102 · Specialty 4010390 (UNAM). COFEPRIS 2507015036X00028. This test is for guidance only and does not replace clinical testing or a medical diagnosis.',
  '· © 2026 Sinlentesmexico': '· © 2026 Sinlentesmexico',

  /* --- Procedimientos --- */
  'Los procedimientos': 'The procedures',
  'Cuatro caminos.': 'Four paths.',
  'Uno es el tuyo.': 'One of them is yours.',
  'El procedimiento correcto depende de tu edad, de lo que te cuesta trabajo ver y de cómo vives tu día. La barra de cada tarjeta muestra qué distancias cubre.': 'The right procedure depends on your age, on what you find hard to see and on how you live your day. The bar on each card shows which distances it covers.',
  '18 a 40 años': 'Ages 18 to 40',
  'Procedimiento Láser': 'Laser Procedure',
  'Cerca': 'Near',
  '40 cm': '40 cm',
  'Intermedia': 'Intermediate',
  '60 cm – 1 m': '60 cm – 1 m',
  'Lejos': 'Far',
  '3 m o más': '3 m or more',
  '40 años o más': 'Age 40 and over',
  'Presbilens Esencial': 'Presbilens Essential',
  'Lente intraocular monofocal, calculado para darte la mejor visión posible en la distancia que más usas.': 'A monofocal intraocular lens, calculated to give you the best possible vision at the distance you use most.',
  'ambos ojos · 3 × $19,933 · 6 × $9,967 · 12 × $4,983': 'both eyes · 3 × $19,933 · 6 × $9,967 · 12 × $4,983',
  'Presbilens Avanzado': 'Presbilens Advanced',
  'Lente de rango extendido (EDOF). Franja continua de enfoque de lejos a intermedia: pantallas y volante.': 'An extended-range (EDOF) lens. A continuous band of focus from far to intermediate: screens and the steering wheel.',
  'ambos ojos · 3 × $28,600 · 6 × $14,300 · 12 × $7,150': 'both eyes · 3 × $28,600 · 6 × $14,300 · 12 × $7,150',
  'Presbilens Premium': 'Presbilens Premium',
  'Lente trifocal. Tres puntos de enfoque para cubrir el rango completo con la mayor independencia de lentes.': 'A trifocal lens. Three focal points covering the full range, for the greatest independence from glasses.',
  'ambos ojos · 3 × $38,600 · 6 × $19,300 · 12 × $9,650': 'both eyes · 3 × $38,600 · 6 × $19,300 · 12 × $9,650',
  'El láser no corrige la vista cansada. Si ya necesitas lentes para leer, la ruta es Presbilens. El test lo aterriza en un minuto.': 'The laser does not correct presbyopia. If you already need glasses to read, the path is Presbilens. The test settles it in a minute.',
  'Hacer el test →': 'Take the test →',
  'Lente intraocular monofocal': 'Monofocal intraocular lens',
  'Lente de rango extendido (EDOF)': 'Extended-range lens (EDOF)',
  'Lente trifocal': 'Trifocal lens',
  'Remodelación corneal con láser': 'Corneal reshaping with laser',

  /* --- Ética --- */
  'Gira para visualizar tu solución': 'Rotate to picture your solution',
  'Tu solución visual es nuestra prioridad, no solo venderte un procedimiento.': 'Your visual solution is our priority, not just selling you a procedure.',
  'Hoy en día, la mayoría de las personas que quieren dejar los lentes tienen alternativas de tratamiento efectivas. Nuestro compromiso es guiarte hacia la más adecuada para tu caso único.': 'Today, most people who want to leave glasses behind have effective treatment options. Our commitment is to guide you to the one that fits your particular case.',
  'Ética y Claridad:': 'Ethics and clarity:',
  'Te diremos la verdad, incluso si la mejor respuesta es esperar.': 'We will tell you the truth, even if the best answer is to wait.',
  'Niveles de tratamiento:': 'Treatment levels:',
  'El test puede sugerir un nivel diferente al que tenías en mente.': 'The test may suggest a different level from the one you had in mind.',
  'Ciencia Primero:': 'Science first:',
  'Tus estudios médicos profundos siempre mandan sobre los resultados preliminares.': 'Your full clinical testing always overrides any preliminary result.',

  /* --- Proceso --- */
  'De la duda al diagnóstico, sin vueltas': 'From doubt to diagnosis, no detours',
  'Paso 01': 'Step 01',
  'Paso 02': 'Step 02',
  'Paso 03': 'Step 03',
  'Haz el test': 'Take the test',
  'Cuatro preguntas, sin datos personales. En un minuto sabes qué procedimiento se acerca a tu perfil.': 'Four questions, no personal data. In a minute you know which procedure matches your profile.',
  'Consulta y diagnóstico': 'Consultation and diagnosis',
  'Con el oftalmólogo, por videollamada o directo en sede. Estudios completos, tu diagnóstico por escrito y la cotización cerrada de tu caso.': 'With the ophthalmologist, by video call or in person at a clinic. Full testing, your diagnosis in writing and a closed quote for your case.',
  'Procedimiento y seguimiento': 'Procedure and follow-up',
  'Ambulatorio, sin hospitalización. Una revisión postoperatoria y seguimiento a doce meses, ya incluidos en el precio.': 'Outpatient, no hospital stay. One post-operative check-up and twelve months of follow-up, already included in the price.',

  /* --- Quiénes somos y videos --- */
  'Quiénes somos': 'About us',
  'Míranos antes de decidir': 'Watch us before you decide',
  'Tres minutos para entender quién te va a atender, cómo trabajamos y por qué el precio que ves aquí es el precio que pagas.': 'Three minutes to understand who will treat you, how we work and why the price you see here is the price you pay.',
  'Quién integra el equipo médico y con qué credenciales.': 'Who is on the medical team and with what credentials.',
  'Qué incluye exactamente el precio todo incluido.': 'Exactly what the all-inclusive price covers.',
  'Cómo funciona la atención en las cinco ciudades.': 'How care works across the five cities.',
  'El proceso paso a paso, de los estudios al alta': 'The process step by step, from testing to discharge',
  'El día del procedimiento': 'The day of the procedure',
  'Lo que nadie te cuenta antes': 'What nobody tells you beforehand',
  'El video recorre el proceso completo: qué estudios te hacen, qué se siente, cuánto dura, con qué indicaciones sales y cómo es el seguimiento de los doce meses.': 'The video walks through the whole process: which tests are done, what it feels like, how long it takes, the instructions you leave with and what the twelve months of follow-up look like.',

  /* --- Después del test --- */
  'Al terminar el test': 'When you finish the test',
  'Tú decides qué tan rápido avanzas': 'You decide how fast you move',
  'Nadie te va a perseguir por teléfono. Cuando veas tu resultado, eliges uno de dos caminos.': 'Nobody is going to chase you by phone. When you see your result, you choose one of two paths.',
  'Lo más elegido': 'Most chosen',
  'Videollamada con un oftalmólogo': 'Video call with an ophthalmologist',
  'Veinte minutos, sin costo, desde donde estés. El especialista revisa tu caso, te dice si el resultado del test tiene sentido y responde lo que quieras preguntar. Si vives fuera de nuestras ciudades, este es el paso que te ahorra el viaje en balde.': 'Twenty minutes, free of charge, from wherever you are. The specialist reviews your case, tells you whether the test result makes sense and answers anything you want to ask. If you live outside our cities, this is the step that saves you a wasted trip.',
  'Disponible en 24 a 48 horas · Sin tarjeta': 'Available within 24 to 48 hours · No card',
  'Agendar tus estudios preoperatorios': 'Book your pre-operative tests',
  'El primer paso real del proceso. El test orienta; los estudios determinan. Con $3,000 cubres seis cosas a la vez, y se descuentan íntegros de tu procedimiento si decides proceder.': 'The first real step in the process. The test guides; the tests decide. For $3,000 you cover six things at once, and the full amount is deducted from your procedure if you decide to go ahead.',
  'Se acredita al total · Se reembolsa si no eres candidato': 'Credited against the total · Refunded if you are not a candidate',
  'Qué incluye agendar tus estudios': 'What booking your tests includes',
  'Estudios preoperatorios completos': 'Complete pre-operative testing',
  'Topografía corneal, biometría y las mediciones que necesita tu caso. Es lo único que permite saber qué procedimiento te corresponde.': 'Corneal topography, biometry and whatever measurements your case requires. It is the only way to know which procedure is right for you.',
  'Diagnóstico por escrito de un oftalmólogo': 'A written diagnosis from an ophthalmologist',
  'El especialista te explica qué encontró y te entrega tu dictamen firmado. Es tuyo: te lo llevas, valga lo que valga para donde quieras.': 'The specialist explains what they found and hands you a signed report. It is yours: you take it with you, to use wherever you like.',
  'Tu fecha apartada con prioridad': 'Your date held with priority',
  'Quedas en agenda antes que quien todavía no ha apartado, en la sede que elijas.': 'You are scheduled ahead of anyone who has not booked yet, at the clinic you choose.',
  'Tu precio sin cambios por 90 días': 'Your price unchanged for 90 days',
  'El precio de tu procedimiento queda fijo tres meses desde que apartas, aunque la lista se actualice.': 'The price of your procedure is locked for three months from the moment you book, even if the price list changes.',
  'Se descuenta íntegro de tu procedimiento': 'Deducted in full from your procedure',
  'Si decides proceder, el monto sale del total. No es un costo adicional.': 'If you decide to go ahead, the amount comes off the total. It is not an extra cost.',
  'Si no eres candidato, se te reembolsa': 'If you are not a candidate, you are refunded',
  'Si el oftalmólogo determina que ningún procedimiento refractivo conviene en tu caso, te devolvemos el monto completo y te quedas con tus estudios.': 'If the ophthalmologist determines that no refractive procedure is right for your case, we refund the full amount and you keep your test results.',
  'El procedimiento sólo se programa después de tus estudios preoperatorios y del diagnóstico del oftalmólogo. Ni el test ni la videollamada sustituyen ese diagnóstico.': 'The procedure is only scheduled after your pre-operative testing and the ophthalmologist’s diagnosis. Neither the test nor the video call replaces that diagnosis.',

  /* --- Precio --- */
  'Precio': 'Price',
  'Un solo precio.': 'One single price.',
  'Sin sorpresas en caja.': 'No surprises at the till.',
  'Los operadores de precio bajo anuncian el procedimiento solo y cobran los estudios aparte. Compara el total, no el anuncio.': 'Low-price operators advertise the procedure alone and charge for the tests separately. Compare the total, not the advert.',
  'Lo que suele anunciarse': 'What is usually advertised',
  'Estudios preoperatorios: se cobran aparte': 'Pre-operative tests: charged separately',
  'Medicamento posterior: se cobra aparte': 'Post-operative medication: charged separately',
  'Quirófano e insumos: se cobran aparte': 'Operating theatre and supplies: charged separately',
  'Lente intraocular: fuera del precio anunciado': 'Intraocular lens: outside the advertised price',
  'Consultas de seguimiento: se cobran por visita': 'Follow-up visits: charged per visit',
  'El total real aparece hasta el día del procedimiento': 'The real total only appears on the day of the procedure',
  'Lo que incluye Sinlentesmexico': 'What Sinlentesmexico includes',
  'Honorarios del oftalmólogo': 'Ophthalmologist’s fees',
  'Uso de quirófano': 'Use of the operating theatre',
  'Sala de recuperación de corta estancia': 'Short-stay recovery room',
  'Lente intraocular de ambos ojos, seleccionado según tu biometría (en Presbilens)': 'Intraocular lens for both eyes, selected from your biometry (with Presbilens)',
  'Medicamento postoperatorio': 'Post-operative medication',
  'Una revisión postoperatoria': 'One post-operative check-up',
  'Seguimiento a doce meses': 'Twelve months of follow-up',
  'Procedimiento': 'Procedure',
  'Precio público': 'List price',
  'Referencia por ojo': 'Reference per eye',
  'Meses sin intereses': 'Interest-free monthly payments',
  '3 MSI de $10,000 · 6 MSI de $5,000': '3 payments of $10,000 · 6 payments of $5,000',
  '3 MSI de $19,933 · 6 MSI de $9,967 · 12 MSI de $4,983': '3 payments of $19,933 · 6 of $9,967 · 12 of $4,983',
  '3 MSI de $28,600 · 6 MSI de $14,300 · 12 MSI de $7,150': '3 payments of $28,600 · 6 of $14,300 · 12 of $7,150',
  '3 MSI de $38,600 · 6 MSI de $19,300 · 12 MSI de $9,650': '3 payments of $38,600 · 6 of $19,300 · 12 of $9,650',
  'Incremento por versión tórica (por ojo)': 'Surcharge for the toric version (per eye)',
  'Presbilens se cotiza en precio bilateral: el paciente siempre requiere ambos ojos, y los procedimientos se realizan en fechas distintas con al menos 2 días de diferencia. Ambas fechas están cubiertas por el precio publicado; la referencia por ojo es sólo informativa. La versión tórica aplica cuando hay astigmatismo y se confirma con tus estudios. Formas de pago: tarjeta de crédito o débito, meses sin intereses (láser a 3 y 6 meses, Presbilens a 12), o efectivo únicamente para el anticipo de apartado — el saldo del procedimiento siempre se paga por medio electrónico. Consulta disponibilidad en tu ciudad al agendar.': 'Presbilens is quoted as a bilateral price: the patient always needs both eyes, and the procedures are carried out on different dates at least 2 days apart. Both dates are covered by the published price; the per-eye figure is for reference only. The toric version applies when astigmatism is present and is confirmed by your testing. Payment methods: credit or debit card, interest-free monthly payments (laser over 3 and 6 months, Presbilens over 12), or cash for the booking deposit only — the balance of the procedure is always paid electronically. Check availability in your city when you book.',

  /* --- Calculadora --- */
  'Comparativo de gasto': 'Spending comparison',
  '¿Cuánto llevas gastado en lentes?': 'How much have you spent on glasses so far?',
  'Mueve los controles con tu propio gasto. El cálculo es estimado y no constituye una oferta.': 'Move the sliders to match your own spending. The figure is an estimate and is not an offer.',
  'Esencial': 'Essential',
  'Avanzado': 'Advanced',
  'Premium': 'Premium',
  'Gasto mensual en lentes, armazones y contactos': 'Monthly spending on glasses, frames and contacts',
  'Años que llevas usando lentes': 'Years you have been wearing glasses',
  'Ya gastaste': 'You have already spent',
  'Proyección a 20 años': 'Projection over 20 years',
  'Gasto total en lentes': 'Total spending on glasses',
  'Procedimiento elegido': 'Chosen procedure',
  'Diferencia estimada frente a seguir comprando lentes': 'Estimated difference against carrying on buying glasses',

  /* --- Testimonios --- */
  'Resultados': 'Results',
  'Escúchalo de quien ya pasó por esto': 'Hear it from people who have been through it',
  'Pacientes de distintas edades y procedimientos contando qué cambió en su día a día: manejar de noche, leer un menú, entrar a nadar sin pensarlo.': 'Patients of different ages and procedures describing what changed in their daily life: driving at night, reading a menu, getting into the pool without a second thought.',
  'Empezar mi test': 'Start my test',
  'Testimonios reales: así cambió su vida': 'Real testimonials: how their lives changed',

  /* --- Sedes --- */
  'Cobertura': 'Coverage',
  'Cinco ciudades, un mismo protocolo': 'Five cities, one single protocol',
  'El mismo procedimiento, los mismos estudios y el mismo seguimiento en la ciudad más cercana a ti.': 'The same procedure, the same testing and the same follow-up in the city nearest you.',
  'Agenda abierta': 'Schedule open',
  'Ciudad de México': 'Mexico City',
  'Colonia del Valle · Satélite': 'Colonia del Valle · Satélite',
  'Lun a Sáb · 9:00 – 18:00': 'Mon to Sat · 9:00 – 18:00',
  'Lun a Sáb · 9:00 – 17:00': 'Mon to Sat · 9:00 – 17:00',
  'Lun a Vie · 9:00 – 17:00': 'Mon to Fri · 9:00 – 17:00',
  'Agendar →': 'Book →',
  'Cómo llegar ↗': 'Get directions ↗',
  'Cancún': 'Cancún',
  'Zona Hotelera · Centro': 'Hotel Zone · Downtown',
  'Mérida': 'Mérida',
  'Norte · Altabrisa': 'North · Altabrisa',
  'Villahermosa': 'Villahermosa',
  'Centro · Tabasco 2000': 'Downtown · Tabasco 2000',
  'Tuxtla Gutiérrez': 'Tuxtla Gutiérrez',
  'Chiapas': 'Chiapas',
  '¿Tienes que viajar?': 'Do you have to travel?',
  'Atendemos en las cinco sedes a quien viene de otra ciudad de México y a quien viene del extranjero. Tu ruta empieza por una videollamada: nadie viaja sin que un oftalmólogo haya revisado su caso antes.': 'All five clinics treat patients coming from other cities in Mexico and from abroad. Your path starts with a video call: nobody travels without an ophthalmologist having reviewed their case first.',
  'Láser: 1 a 3 noches · Presbilens: 6 a 8 noches': 'Laser: 1 to 3 nights · Presbilens: 6 to 8 nights',
  'Otra ciudad →': 'Another city →',
  'Del extranjero →': 'From abroad →',

  /* --- Respaldo --- */
  'Quién te atiende': 'Who treats you',
  'El respaldo detrás del procedimiento': 'The credentials behind the procedure',
  'Oftalmólogos certificados': 'Certified ophthalmologists',
  'Especialistas con cédula profesional validada ante la SEP y formación en procedimientos refractivos. Integran el equipo médico Sinlentesmexico.': 'Specialists whose professional licence is verified with the SEP, trained in refractive procedures. They make up the Sinlentesmexico medical team.',
  'Autorización sanitaria': 'Health authorisation',
  'Operación autorizada por la Secretaría de Salud.': 'Operating under authorisation from the Ministry of Health.',
  'COFEPRIS 2507015036X00028': 'COFEPRIS 2507015036X00028',
  'Responsable sanitario': 'Medical director',
  'Dr. Edgar Antonio Solano Tego.': 'Dr. Edgar Antonio Solano Tego.',
  'Cédula Prof. 2013102 · Esp. 4010390 (UNAM)': 'Professional licence 2013102 · Specialty 4010390 (UNAM)',
  'Expediente y consentimiento': 'Records and consent',
  'Conforme a la NOM-004-SSA3-2012, cada paciente firma consentimiento informado y cuenta con expediente clínico.': 'Under Mexican standard NOM-004-SSA3-2012, every patient signs an informed consent form and has a clinical record.',

  /* --- Cierre --- */
  'Empieza por saber qué te toca': 'Start by finding out what applies to you',
  'Cuatro preguntas, sin datos personales. Al final eliges si quieres hablar con un oftalmólogo por videollamada o agendar directo tus estudios.': 'Four questions, no personal data. At the end you choose whether to speak with an ophthalmologist by video call or book your tests directly.',
  'Sin costo · Sin compromiso · CDMX, Cancún, Mérida, Villahermosa y Tuxtla Gutiérrez': 'Free · No obligation · Mexico City, Cancún, Mérida, Villahermosa and Tuxtla Gutiérrez',
  'WhatsApp': 'WhatsApp',

  /* --- Simulador --- */
  'Simulador': 'Simulator',
  'Simulador de visión': 'Vision simulator',
  'Salir': 'Close',
  'Escena': 'Scene',
  'Condición ocular': 'Eye condition',
  'Comparar': 'Compare',
  'Comparar con': 'Compare with',
  'Comparar dos procedimientos': 'Compare two procedures',
  'Conducción nocturna': 'Night driving',
  'Avenida de día': 'Daytime avenue',
  'Cataratas': 'Cataracts',
  'Cataratas + astigmatismo': 'Cataracts + astigmatism',
  'Presbicia': 'Presbyopia',
  'Presbicia + astigmatismo': 'Presbyopia + astigmatism',
  'Sin corregir': 'Uncorrected',
  'Simulación de visión': 'Vision simulation',
  'El navegador no deja arrancar el video solo. Toca aquí para reproducirlo.': 'The browser will not start the video on its own. Tap here to play it.',
  'No se pudo cargar el video. Si abriste el archivo con doble clic, ábrelo con Live Server o súbelo a un servidor.': 'The video could not be loaded. If you opened the file by double-clicking it, open it with Live Server or upload it to a server.',
  'Demo sobre video de referencia (calles de CDMX, Pexels). Representación orientativa, no un resultado garantizado.': 'Demo over reference footage (streets of Mexico City, Pexels). An illustration only, not a guaranteed result.',

  /* --- Etiquetas de accesibilidad --- */
  'Cómo funciona la corrección visual': 'How vision correction works',
  'Ojo humano en 3D: córnea, iris, cristalino y retina': 'Human eye in 3D: cornea, iris, natural lens and retina',
  'Modelo 3D interactivo de un lente intraocular': 'Interactive 3D model of an intraocular lens',
  'Reproducir: Qué es Sinlentesmexico y cómo trabajamos': 'Play: What Sinlentesmexico is and how we work',
  'Reproducir: El proceso paso a paso, de los estudios al alta': 'Play: The process step by step, from testing to discharge',
  'Reproducir: Testimonios reales: así cambió su vida': 'Play: Real testimonials: how their lives changed',
  'Íconos 3D de los temas de las preguntas: ojo, lentes, precio, videollamada, calendario, estudios y seguridad': '3D icons for the question topics: eye, lenses, price, video call, calendar, testing and safety',

  /* --- Resultado del test (test.html) --- */
  'Anterior': 'Back',
  'Resultado orientativo': 'Guidance result',
  'Tu perfil apunta a': 'Your profile points to',
  'Por qué te decimos esto': 'Why we are telling you this',
  'No vendemos un procedimiento. Determinamos cuál te corresponde. Este resultado es un punto de partida: los estudios preoperatorios son los que lo confirman o lo corrigen.': 'We do not sell a procedure. We work out which one is right for you. This result is a starting point: the pre-operative testing is what confirms or corrects it.',
  'Dos formas de avanzar. Elige la tuya.': 'Two ways forward. Choose yours.',
  '20 minutos, sin costo, desde donde estés. El especialista revisa tu caso, te dice si el resultado del test tiene sentido y resuelve tus dudas antes de que gastes un peso.': '20 minutes, free of charge, from wherever you are. The specialist reviews your case, tells you whether the test result makes sense and answers your questions before you spend a peso.',
  'Disponible en 24 a 48 horas · No necesitas ir a la sede': 'Available within 24 to 48 hours · No need to visit a clinic',
  'Elegir videollamada': 'Choose the video call',
  'Elegir videollamada →': 'Choose the video call →',
  'Agendar mis estudios preoperatorios': 'Book my pre-operative tests',
  'El primer paso real. Con $3,000 agendas tus estudios completos, recibes tu diagnóstico por escrito de un oftalmólogo, apartas tu fecha y congelas tu precio. Se descuenta íntegro si procedes.': 'The first real step. For $3,000 you book your full testing, receive your written diagnosis from an ophthalmologist, hold your date and lock your price. It is deducted in full if you go ahead.',
  'Ver qué incluye': 'See what is included',
  '¿Todavía no quieres decidir?': 'Not ready to decide yet?',
  'Recibe tu resultado por WhatsApp y lo piensas →': 'Get your result on WhatsApp and think it over →',
  '¿Tienes que viajar para atenderte?': 'Do you have to travel for treatment?',
  'Vivo en otra ciudad de México': 'I live in another city in Mexico',
  'Vivo fuera de México': 'I live outside Mexico',
  'Ver el detalle de': 'See the details of',
  'y su precio': 'and its price',
  '← Volver al test': '← Back to the test',
  'ambos ojos · todo incluido': 'both eyes · all inclusive',
  'o 3 MSI de $10,000 · 6 MSI de $5,000': 'or 3 payments of $10,000 · 6 of $5,000',
  'o 3 MSI de $19,933 · 6 MSI de $9,967 · 12 MSI de $4,983': 'or 3 payments of $19,933 · 6 of $9,967 · 12 of $4,983',
  'o 3 MSI de $28,600 · 6 MSI de $14,300 · 12 MSI de $7,150': 'or 3 payments of $28,600 · 6 of $14,300 · 12 of $7,150',
  'o 3 MSI de $38,600 · 6 MSI de $19,300 · 12 MSI de $9,650': 'or 3 payments of $38,600 · 6 of $19,300 · 12 of $9,650',

  /* Razones del test: una por respuesta. El prefijo [TEXTO DE PRUEBA] viene
     del sitio original; se conserva para que siga visible que falta el texto
     definitivo de la clínica. */
  'Por eso el láser es la ruta que mejor embona contigo: resuelve lo que te limita hoy, sin sustituir un cristalino que todavía trabaja bien.': 'That is why the laser is the path that fits you best: it solves what limits you today, without replacing a natural lens that is still working well.',
  '[TEXTO DE PRUEBA] Por eso Presbilens Esencial es la ruta que mejor embona contigo: un lente monofocal calculado para la distancia que más usas.': '[DRAFT TEXT] That is why Presbilens Essential is the path that fits you best: a monofocal lens calculated for the distance you use most.',
  '[TEXTO DE PRUEBA] Por eso Presbilens Avanzado es la ruta que mejor embona contigo: una franja continua de enfoque de lejos a intermedia, para pantallas y volante.': '[DRAFT TEXT] That is why Presbilens Advanced is the path that fits you best: a continuous band of focus from far to intermediate, for screens and the steering wheel.',
  '[TEXTO DE PRUEBA] Por eso Presbilens Premium es la ruta que mejor embona contigo: tres puntos de enfoque para cubrir el rango completo con la mayor independencia de lentes.': '[DRAFT TEXT] That is why Presbilens Premium is the path that fits you best: three focal points covering the full range, for the greatest independence from glasses.',
  'Antes de los 40 el cristalino todavía enfoca de cerca por sí solo, así que corregir la córnea con láser suele bastar.': 'Before 40 the natural lens still focuses up close on its own, so correcting the cornea with the laser is usually enough.',
  'Si sólo te cuesta ver de lejos, el láser puede seguir siendo la opción.': 'If you only struggle to see at a distance, the laser may still be the option.',
  '[TEXTO DE PRUEBA] Entre los 40 y 49 años empieza la vista cansada: el láser no la corrige, y la ruta es Presbilens.': '[DRAFT TEXT] Presbyopia begins between 40 and 49: the laser does not correct it, and the path is Presbilens.',
  '[TEXTO DE PRUEBA] Entre los 50 y 59 años el lente intraocular es la etapa habitual: sustituye el cristalino y atiende la vista cansada.': '[DRAFT TEXT] Between 50 and 59 the intraocular lens is the usual stage: it replaces the natural lens and addresses presbyopia.',
  '[TEXTO DE PRUEBA] A partir de los 60 años se evalúa también la salud del cristalino, y el lente intraocular suele ser la ruta.': '[DRAFT TEXT] From 60 onwards the health of the natural lens is also assessed, and the intraocular lens is usually the path.',
  'Nos dijiste que lo que más te cuesta es ver de lejos, que es exactamente lo que corrige la remodelación corneal.': 'You told us that what you struggle with most is seeing at a distance, which is exactly what corneal reshaping corrects.',
  '[TEXTO DE PRUEBA] Nos dijiste que lo que más te cuesta es ver de lejos: es la distancia base de cualquier nivel de Presbilens.': '[DRAFT TEXT] You told us that what you struggle with most is seeing at a distance: that is the base distance of every Presbilens level.',
  '[TEXTO DE PRUEBA] Nos dijiste que te cuesta ver de cerca: el especialista revisará la causa, porque antes de los 40 el cristalino todavía enfoca de cerca.': '[DRAFT TEXT] You told us you struggle to see up close: the specialist will look into the cause, because before 40 the natural lens still focuses up close.',
  'Si ya necesitas alejar el celular para leer, el láser no corrige eso y la ruta suele ser Presbilens.': 'If you already have to hold your phone further away to read, the laser does not correct that and the path is usually Presbilens.',
  '[TEXTO DE PRUEBA] Te cuesta ver de lejos y de cerca, así que conviene cubrir más de una distancia.': '[DRAFT TEXT] You struggle both far away and up close, so it is worth covering more than one distance.',
  '[TEXTO DE PRUEBA] Te cuesta ver de noche, con reflejos y halos: lo tomamos en cuenta para no proponerte el nivel con más halos nocturnos.': '[DRAFT TEXT] You struggle at night, with glare and halos: we take that into account so as not to propose the level with the most night-time halos.',
  'Pasas el día en pantallas, y esa es una distancia intermedia sostenida: es la franja que peor cubre un lente de una sola distancia.': 'You spend the day on screens, and that is a sustained intermediate distance: it is the band a single-distance lens covers worst.',
  'Si nos dices que manejas mucho de noche, el test no te propone el nivel más alto: los lentes trifocales tienden a generar más halos nocturnos que los de rango extendido.': 'If you tell us you drive a lot at night, the test does not propose the highest level to you: trifocal lenses tend to produce more night-time halos than extended-range ones.',
  '[TEXTO DE PRUEBA] Haces deporte y actividades al aire libre: la visión de lejos es la que más usas.': '[DRAFT TEXT] You play sport and spend time outdoors: distance vision is the one you use most.',
  '[TEXTO DE PRUEBA] Lees y haces trabajo de detalle: la distancia cercana es clave en tu día.': '[DRAFT TEXT] You read and do detailed work: near distance is key in your day.',
  'No te molesta usar lentes para leer, así que te proponemos el nivel más económico.': 'You do not mind wearing glasses to read, so we propose the most affordable level.',
  '[TEXTO DE PRUEBA] Quieres depender lo menos posible de los lentes, cubriendo la mayoría de tus actividades.': '[DRAFT TEXT] You want to depend on glasses as little as possible, covering most of your activities.',
  'Buscas la mayor independencia posible, cubriendo todas las distancias.': 'You are after the greatest possible independence, covering every distance.',
  '[TEXTO DE PRUEBA] Prefieres que el especialista te oriente: te proponemos un punto medio para revisarlo juntos en la videollamada.': '[DRAFT TEXT] You would rather the specialist guide you: we propose a middle option to review together on the video call.',
  'Por eso el sistema descarta el nivel más alto por su cuenta.': 'That is why the system rules out the highest level on its own.',
  'Remodelación corneal con láser': 'Corneal reshaping with laser',

  /* --- Preguntas frecuentes --- */
  'Preguntas frecuentes': 'Frequently asked questions',
  'Lo que todos preguntan por WhatsApp': 'What everyone asks us on WhatsApp',
  'Preguntar por WhatsApp': 'Ask on WhatsApp',

  '¿Cuál es la diferencia entre el láser y Presbilens?': 'What is the difference between the laser and Presbilens?',
  'El láser remodela la córnea y corrige miopía, hipermetropía y astigmatismo. Presbilens sustituye el cristalino por un lente intraocular y además atiende la vista cansada. El láser suele ser la ruta antes de los 40; Presbilens, después.': 'The laser reshapes the cornea and corrects myopia, hyperopia and astigmatism. Presbilens replaces the natural lens with an intraocular lens and also addresses presbyopia. The laser is usually the path before 40; Presbilens, after.',

  'Tengo 45 años, ¿me sirve el láser?': 'I am 45 — is the laser right for me?',
  'Depende de qué te esté limitando. Si sólo te cuesta ver de lejos, el láser puede seguir siendo la opción. Si ya necesitas alejar el celular para leer, el láser no corrige eso y la ruta suele ser Presbilens. El test lo separa en la primera pregunta.': 'It depends on what is limiting you. If you only struggle to see at a distance, the laser may still be the option. If you already have to hold your phone further away to read, the laser does not correct that and the path is usually Presbilens. The test separates the two in its first question.',

  '¿Qué diferencia hay entre Esencial, Avanzado y Premium?': 'What is the difference between Essential, Advanced and Premium?',
  'El rango de distancias que cubre el lente. Esencial es monofocal y se calcula para una distancia principal. Avanzado es de rango extendido y cubre de lejos a intermedia de forma continua. Premium es trifocal y cubre lejos, intermedia y cerca. Es la barra que aparece en cada tarjeta de procedimiento.': 'The range of distances the lens covers. Essential is monofocal and is calculated for one main distance. Advanced is extended-range and covers far to intermediate continuously. Premium is trifocal and covers far, intermediate and near. It is the bar shown on each procedure card.',

  '¿Qué pasa si tengo astigmatismo?': 'What if I have astigmatism?',
  'Existe una versión tórica del lente que lo corrige. Añade $6,000 por ojo sobre el precio del nivel elegido. Si aplica en tu caso se confirma con tus estudios preoperatorios y queda documentado en tu cotización antes de que decidas.': 'There is a toric version of the lens that corrects it. It adds $6,000 per eye to the price of the level you choose. Whether it applies to you is confirmed by your pre-operative testing and documented in your quote before you decide.',

  '¿Voy a ver halos de noche?': 'Will I see halos at night?',
  'Algunos pacientes perciben halos alrededor de las luces durante el periodo de adaptación, con mayor frecuencia en los lentes trifocales que en los de rango extendido. Por eso, si nos dices que manejas mucho de noche, el test no te propone el nivel más alto. El especialista lo evalúa contigo al revisar tus estudios.': 'Some patients see halos around lights during the adaptation period, more often with trifocal lenses than with extended-range ones. That is why, if you tell us you drive a lot at night, the test does not propose the highest level to you. The specialist assesses it with you when reviewing your test results.',

  '¿Qué incluye exactamente el precio?': 'What exactly does the price include?',
  'Estudios preoperatorios, procedimiento, medicamento posterior y seguimiento a doce meses. No hay cobros separados por consulta de control dentro de ese periodo.': 'Pre-operative testing, the procedure, post-operative medication and twelve months of follow-up. There are no separate charges for check-up visits within that period.',

  '¿Qué es la videollamada y qué pasa en ella?': 'What is the video call and what happens in it?',
  'Son unos veinte minutos con un oftalmólogo del equipo, sin costo y sin tarjeta. Revisa el resultado de tu test, te pregunta por tus antecedentes y te dice si la ruta que salió tiene sentido en tu caso. No es una consulta de venta: si te conviene esperar o hacer otra cosa, te lo dice. Te enviamos el enlace por WhatsApp.': 'It is about twenty minutes with an ophthalmologist from the team, free of charge and with no card. They review your test result, ask about your history and tell you whether the path it suggested makes sense in your case. It is not a sales consultation: if you are better off waiting or doing something else, they will say so. We send you the link on WhatsApp.',

  '¿La videollamada sustituye los estudios presenciales?': 'Does the video call replace in-person testing?',
  'No. Ningún procedimiento se programa sin estudios presenciales: topografía corneal, biometría y revisión completa. La videollamada sirve para que resuelvas tus dudas con el especialista antes de invertir tiempo y dinero en trasladarte, sobre todo si vives fuera de nuestras cinco ciudades.': 'No. No procedure is scheduled without in-person testing: corneal topography, biometry and a full examination. The video call is there so you can settle your questions with the specialist before investing time and money in travelling, especially if you live outside our five cities.',

  '¿Me operan los dos ojos el mismo día?': 'Are both eyes operated on the same day?',
  'En Presbilens no. Se interviene un ojo y, al día siguiente, el oftalmólogo revisa su evolución antes de autorizar el segundo, que se programa con al menos 2 días de diferencia. Es un criterio de seguridad: permite verificar el resultado del primer ojo antes de intervenir el segundo. El precio publicado cubre ambos ojos y ambas fechas, no es un cobro por ojo.': 'Not with Presbilens. One eye is operated on and, the next day, the ophthalmologist reviews its progress before approving the second, which is scheduled at least 2 days later. It is a safety rule: it allows the result of the first eye to be checked before operating on the second. The published price covers both eyes and both dates; it is not a charge per eye.',

  '¿El quirófano se cobra aparte?': 'Is the operating theatre charged separately?',
  'No. El uso de quirófano, la sala de recuperación de corta estancia, los honorarios del oftalmólogo, el medicamento posterior, una revisión postoperatoria y el seguimiento a doce meses ya están dentro del precio. En Presbilens también está incluido el lente intraocular de ambos ojos. Esta es la diferencia concreta con los operadores que anuncian solo el procedimiento.': 'No. Use of the operating theatre, the short-stay recovery room, the ophthalmologist’s fees, post-operative medication, one post-operative check-up and twelve months of follow-up are all inside the price. With Presbilens the intraocular lens for both eyes is included as well. This is the concrete difference from operators who advertise the procedure alone.',

  '¿El test me va a recomendar siempre lo más caro?': 'Will the test always recommend the most expensive option?',
  'No, y está diseñado para lo contrario. Si nos dices que no te molesta usar lentes para leer, te propone el nivel más económico. Si nos dices que manejas mucho de noche, el sistema descarta el nivel más alto por su cuenta, porque los lentes trifocales tienden a generar más halos nocturnos que los de rango extendido. Al ver tu resultado te explicamos punto por punto qué respuesta tuya llevó a esa recomendación.': 'No, and it is designed to do the opposite. If you tell us you do not mind wearing glasses to read, it proposes the cheapest level. If you tell us you drive a lot at night, the system rules out the highest level on its own, because trifocal lenses tend to produce more night-time halos than extended-range ones. When you see your result we explain point by point which of your answers led to that recommendation.',

  '¿Cuánto cuestan los estudios preoperatorios?': 'How much does pre-operative testing cost?',
  '$3,000, y se descuentan íntegros del precio de tu procedimiento si decides proceder. Incluyen topografía corneal, biometría y las mediciones que requiera tu caso, más tu diagnóstico por escrito firmado por un oftalmólogo, que conservas pase lo que pase.': '$3,000, deducted in full from the price of your procedure if you decide to go ahead. It covers corneal topography, biometry and whatever measurements your case requires, plus your written diagnosis signed by an ophthalmologist, which you keep whatever happens.',

  '¿Por qué se pagan los estudios preoperatorios?': 'Why is pre-operative testing paid for?',
  'Porque son un servicio médico real: topografía corneal, biometría y las mediciones que requiere tu caso, hechas con equipo especializado y revisadas por un oftalmólogo, que además te entrega tu diagnóstico por escrito. Ese estudio es tuyo y te lo llevas. Si decides proceder, el monto se descuenta íntegro del precio de tu procedimiento, así que no representa un costo adicional.': 'Because it is a real medical service: corneal topography, biometry and the measurements your case requires, performed with specialised equipment and reviewed by an ophthalmologist, who also gives you your diagnosis in writing. That report is yours and you take it with you. If you decide to go ahead, the amount is deducted in full from the price of your procedure, so it is not an extra cost.',

  '¿Y si me hago los estudios y no soy candidato?': 'And if I have the testing done and I am not a candidate?',
  'Se te reembolsa el monto completo y conservas tus estudios y tu diagnóstico firmado. Si cancelas antes de realizarte los estudios, también se te reembolsa todo. Si ya te los hiciste y simplemente decides no continuar, el monto cubre el servicio que recibiste y te quedas con tu diagnóstico.': 'You are refunded the full amount and you keep your test results and your signed diagnosis. If you cancel before having the testing done, you are also refunded in full. If you have already had it done and simply decide not to continue, the amount covers the service you received and you keep your diagnosis.',

  '¿Qué gano con apartar además de los estudios?': 'What do I gain by booking, beyond the testing?',
  'Tu fecha queda apartada con prioridad en la sede que elijas, y el precio sobre el que se te cotiza no cambia durante 90 días aunque la lista se actualice. Y sales con un diagnóstico oftalmológico por escrito, que tiene valor por sí mismo: es tuyo, sin importar lo que decidas después.': 'Your date is held with priority at the clinic you choose, and the price you are quoted does not change for 90 days even if the list is updated. And you leave with a written ophthalmological diagnosis, which has value in itself: it is yours, whatever you decide afterwards.',

  '¿Es seguro pagar en línea?': 'Is it safe to pay online?',
  'El cobro lo procesa una pasarela de pago certificada. Sinlentesmexico no recibe ni almacena los datos de tu tarjeta en ningún momento. Recibes tu comprobante por correo.': 'The payment is processed by a certified payment gateway. Sinlentesmexico never receives or stores your card details. You receive your receipt by email.',

  '¿Duele el procedimiento?': 'Does the procedure hurt?',
  'Se aplican gotas anestésicas antes de empezar. Durante el procedimiento puede sentirse una ligera presión, no dolor. Después algunas personas reportan ardor o comezón leve durante unas horas.': 'Anaesthetic drops are applied before starting. During the procedure you may feel slight pressure, not pain. Afterwards some people report mild stinging or itching for a few hours.',

  '¿En cuánto tiempo me recupero?': 'How long does recovery take?',
  'Es ambulatorio: sales caminando el mismo día. La mayoría de los pacientes retoma su actividad habitual en pocos días, con indicaciones específicas de cuidado durante las primeras semanas. El oftalmólogo te entrega el plan junto con tu diagnóstico.': 'It is an outpatient procedure: you walk out the same day. Most patients return to their usual activities within a few days, with specific care instructions for the first weeks. The ophthalmologist gives you the plan along with your diagnosis.',

  '¿Qué pasa si los estudios muestran que no soy candidato?': 'What happens if the testing shows I am not a candidate?',
  'Se te reembolsa el monto completo de tus estudios y conservas tu diagnóstico por escrito. El oftalmólogo te explica qué encontró y te orienta sobre qué sí conviene hacer en tu caso.': 'You are refunded the full amount for your testing and you keep your written diagnosis. The ophthalmologist explains what they found and advises you on what would be worth doing in your case.',

  '¿El IMSS o mi seguro cubre el procedimiento?': 'Does IMSS or my insurance cover the procedure?',
  'Los procedimientos refractivos suelen considerarse electivos y no están cubiertos por seguridad social. Algunas pólizas privadas los contemplan de forma parcial: conviene revisarlo directamente con tu aseguradora. Nosotros ofrecemos meses sin intereses: 3 y 6 en láser; 3, 6 y 12 en Presbilens.': 'Refractive procedures are usually considered elective and are not covered by public health insurance. Some private policies cover them partially: it is worth checking directly with your insurer. We offer interest-free monthly payments: 3 and 6 for the laser; 3, 6 and 12 for Presbilens.',

  'Vivo en otra ciudad o fuera de México, ¿cómo funciona?': 'I live in another city or outside Mexico — how does it work?',
  'Igual en los dos casos: tu ruta empieza obligatoriamente por la videollamada con el oftalmólogo, antes de que compres boletos o reserves nada. Si tienes topografía o estudios previos, los mandas por WhatsApp y el especialista los revisa para detectar cualquier señal que desaconseje el viaje. Con su visto bueno reservas tu procedimiento, y tus estudios completos vienen incluidos el día que llegas. Atendemos en las cinco sedes, y la logística de hospedaje y traslado la coordinamos con aliados locales una vez que tienes fecha confirmada.': 'The same in both cases: your path has to start with the video call with the ophthalmologist, before you buy tickets or book anything. If you have previous topography or test results, you send them on WhatsApp and the specialist reviews them for any sign that would advise against the trip. With their go-ahead you book your procedure, and your full testing is included on the day you arrive. We treat patients at all five clinics, and accommodation and transfer logistics are coordinated with local partners once your date is confirmed.',

  '¿Puedo hacerme los estudios en mi país y mandarlos?': 'Can I have the testing done in my country and send it over?',
  'Nos sirven para anticipar tu caso y por eso te los pedimos, pero los estudios completos se hacen aquí y ya están incluidos en tu reserva. En Presbilens hay una razón adicional: la biometría que determina la potencia exacta de tu lente depende del instrumento y de la constante que el cirujano tiene calibrada con su propia técnica, así que ese cálculo no puede tomarse de un estudio externo.': 'They help us anticipate your case, which is why we ask for them, but the full testing is done here and is already included in your booking. With Presbilens there is an additional reason: the biometry that determines the exact power of your lens depends on the instrument and on the constant the surgeon has calibrated to their own technique, so that calculation cannot be taken from an external report.',

  '¿Cuántos días tengo que quedarme?': 'How many days do I need to stay?',
  'Con láser, entre 1 y 3 noches. Si tu vuelo aterriza con tiempo, los estudios y el procedimiento pueden hacerse el mismo día que llegas; si llegas tarde, se hacen al día siguiente. En la videollamada revisamos tu itinerario y lo definimos contigo. Con Presbilens, entre 6 y 8 noches, porque los ojos se intervienen en fechas distintas con al menos 2 días de diferencia y hay revisiones de por medio. Conviene saberlo antes de comprar vuelos.': 'With the laser, between 1 and 3 nights. If your flight lands early enough, the testing and the procedure can be done the same day you arrive; if you arrive late, they are done the next day. On the video call we go over your itinerary and settle it with you. With Presbilens, between 6 and 8 nights, because the eyes are operated on different dates at least 2 days apart, with check-ups in between. Worth knowing before you buy flights.',

  '¿Y si viajo y al llegar los estudios muestran que no soy candidato?': 'And if I travel and on arrival the testing shows I am not a candidate?',
  'Se te reembolsa el monto completo, sin descontar los estudios que ya te hicimos. Si un oftalmólogo nuestro te autorizó el viaje, asumimos ese riesgo contigo. Esa es justamente la razón por la que la videollamada previa es obligatoria y no opcional.': 'You are refunded the full amount, with no deduction for the testing we have already done. If one of our ophthalmologists approved the trip, we take that risk with you. That is precisely why the prior video call is mandatory and not optional.',

  '¿Quién realiza el procedimiento?': 'Who performs the procedure?',
  'Un oftalmólogo del equipo médico Sinlentesmexico, con cédula de especialidad validada. Los datos del responsable sanitario se incluyen en tu consentimiento informado y en tu expediente clínico, conforme a la NOM-004-SSA3-2012.': 'An ophthalmologist from the Sinlentesmexico medical team, with a verified specialty licence. The medical director’s details are included in your informed consent form and in your clinical record, under Mexican standard NOM-004-SSA3-2012.'
  };

  /* Frases que el sitio arma al vuelo (por ejemplo la nota del simulador o
     los años de la calculadora). Se aplican por partes cuando el texto
     completo no está en el diccionario. */
  var FRAG = [
    [/^(\d+) años$/, '$1 years'],
    [/^1 año$/, '1 year'],
    [/^Pregunta (\d+) de 4$/, 'Question $1 of 4'],
    ['A la izquierda, ', 'On the left, '],
    ['; a la derecha, ', '; on the right, '],
    ['. Arrastra los selectores para cambiar cualquiera de los dos.', '. Use the selectors to change either one.'],
    ['Estás viendo cómo quedaría con ', 'You are seeing how it would look with '],
    ['Así se ve hoy, sin corregir. Elige un procedimiento para comparar.', 'This is how it looks today, uncorrected. Choose a procedure to compare.'],
    ['Conducción nocturna', 'Night driving'],
    ['Avenida de día', 'Daytime avenue'],
    ['Cataratas + astigmatismo', 'Cataracts + astigmatism'],
    ['Presbicia + astigmatismo', 'Presbyopia + astigmatism'],
    ['Cataratas', 'Cataracts'],
    ['Presbicia', 'Presbyopia'],
    ['sin corregir', 'uncorrected'],
    ['Sin corregir', 'Uncorrected'],
    ['Presbilens Esencial', 'Presbilens Essential'],
    ['Presbilens Avanzado', 'Presbilens Advanced'],
    ['Procedimiento Láser', 'Laser Procedure']
  ];

  var ATRIBUTOS = ['aria-label', 'alt', 'title', 'placeholder'];
  /* nodo -> { es: original, en: lo que escribimos }.
     Guardamos las dos porque Preact reusa los nodos y les cambia el texto:
     si sólo marcáramos "ya traducido", un nodo reciclado se quedaría en
     español para siempre. */
  var memoria = new WeakMap();
  var idioma = 'es';
  var aplicando = false;

  function traducir(txt) {
    var limpio = txt.trim();
    if (!limpio) return null;
    if (DIC[limpio]) return txt.replace(limpio, DIC[limpio]);

    var salida = limpio, tocado = false;
    for (var i = 0; i < FRAG.length; i++) {
      var de = FRAG[i][0], a = FRAG[i][1];
      var antes = salida;
      salida = typeof de === 'string' ? salida.split(de).join(a) : salida.replace(de, a);
      if (salida !== antes) tocado = true;
    }
    return tocado ? txt.replace(limpio, salida) : null;
  }

  function pasarTexto(nodo) {
    var m = memoria.get(nodo);
    if (idioma === 'es') {
      if (m && nodo.nodeValue === m.en) nodo.nodeValue = m.es;
      memoria['delete'](nodo);
      return;
    }
    if (m && nodo.nodeValue === m.en) return;   /* sigue siendo lo que escribimos */
    var nuevo = traducir(nodo.nodeValue);
    if (nuevo !== null && nuevo !== nodo.nodeValue) {
      memoria.set(nodo, { es: nodo.nodeValue, en: nuevo });
      nodo.nodeValue = nuevo;
    } else {
      memoria['delete'](nodo);
    }
  }

  function pasarAtributos(el) {
    var guardado = el.__i18nAttr || (el.__i18nAttr = {});
    for (var i = 0; i < ATRIBUTOS.length; i++) {
      var a = ATRIBUTOS[i], g = guardado[a], v = el.getAttribute(a);
      if (idioma === 'es') {
        if (g && v === g.en) el.setAttribute(a, g.es);
        delete guardado[a];
        continue;
      }
      if (!v) continue;
      if (g && v === g.en) continue;
      var nuevo = traducir(v);
      if (nuevo !== null && nuevo !== v) { guardado[a] = { es: v, en: nuevo }; el.setAttribute(a, nuevo); }
      else delete guardado[a];
    }
  }

  function recorrer(raiz) {
    if (!raiz) return;
    if (raiz.nodeType === 3) { pasarTexto(raiz); return; }
    if (raiz.nodeType !== 1) return;
    if (raiz.closest && raiz.closest('[data-i18n-ignorar]')) return;

    var w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentElement;
        if (!p || p.tagName === 'SCRIPT' || p.tagName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p.closest('[data-i18n-ignorar]')) return NodeFilter.FILTER_REJECT;
        return n.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n, lote = [];
    while ((n = w.nextNode())) lote.push(n);
    for (var i = 0; i < lote.length; i++) pasarTexto(lote[i]);

    pasarAtributos(raiz);
    var els = raiz.querySelectorAll('[aria-label],[alt],[title],[placeholder]');
    for (var j = 0; j < els.length; j++) pasarAtributos(els[j]);
  }

  /* Sólo escribe si el valor cambió de verdad. Escribir un atributo, aunque
     sea el mismo, obliga al navegador a recalcular estilos; y como los
     botones viven en la barra, que lleva desenfoque de fondo, eso hacía
     parpadear toda la barra mientras se hacía scroll. */
  function pintarBotones() {
    var bs = document.querySelectorAll('.lang-b[data-lang]');
    for (var i = 0; i < bs.length; i++) {
      var quiero = bs[i].getAttribute('data-lang') === idioma ? 'true' : 'false';
      if (bs[i].getAttribute('aria-pressed') !== quiero) bs[i].setAttribute('aria-pressed', quiero);
    }
  }

  function aplicar() {
    aplicando = true;
    document.documentElement.lang = idioma;
    recorrer(document.body);
    pintarBotones();
    aplicando = false;
  }

  function cambiar(nuevo) {
    if (nuevo === idioma) return;
    idioma = nuevo;
    try { localStorage.setItem('sl_idioma', idioma); } catch (e) {}
    aplicar();
  }

  try { idioma = localStorage.getItem('sl_idioma') === 'en' ? 'en' : 'es'; } catch (e) {}

  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang-b[data-lang]');
    if (!b) return;
    e.preventDefault();
    cambiar(b.getAttribute('data-lang'));
  });

  /* El sitio se redibuja con Preact: hay que volver a traducir lo que entra. */
  var pendiente = null;
  new MutationObserver(function (muts) {
    if (aplicando) return;
    /* En español no hay nada que traducir: sólo interesa si aparecieron
       botones de idioma nuevos. Mientras se hace scroll la página se
       redibuja todo el tiempo, y despertarse en cada cuadro para no hacer
       nada era justo lo que hacía parpadear la barra. */
    var hayQueMirar = false;
    for (var i = 0; i < muts.length && !hayQueMirar; i++) {
      var m = muts[i];
      if (idioma === 'en') {
        hayQueMirar = m.addedNodes.length > 0 || m.type === 'characterData';
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j];
          if (n.nodeType === 1 && (n.matches && n.matches('.lang-b') || n.querySelector && n.querySelector('.lang-b'))) { hayQueMirar = true; break; }
        }
      }
    }
    if (!hayQueMirar || pendiente) return;
    /* setTimeout y no requestAnimationFrame: en una pestaña de fondo
       rAF no corre, y la página se quedaría a medio traducir. */
    pendiente = setTimeout(function () { pendiente = null; if (idioma === 'en') aplicar(); else pintarBotones(); }, 0);
  }).observe(document.body, { childList: true, subtree: true, characterData: true });

  aplicar();
  window.slIdioma = { get: function () { return idioma; }, set: cambiar, dic: DIC };
})();
