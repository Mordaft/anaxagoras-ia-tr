# 

# ÍNDEX

[**1\. Introducció	2**](#introducció)

[1.1. Per què he escollit aquest tema?	2](#per-què-he-escollit-aquest-tema?)

[1.2. Hipòtesi de partida	3](#hipòtesi-de-partida)

[1.3. Objectius	4](#objectius)

[**2\. Introducció a la Intel·ligència Artificial (IA) i Arquitectura del Sistema	4**](#introducció-a-la-intel·ligència-artificial-\(ia\)-i-arquitectura-del-sistema)

[2.1. Què és la IA Generativa i el Processament del Llenguatge Natural (PLN)	4](#què-és-la-ia-generativa-i-el-processament-del-llenguatge-natural-\(pln\))

[2.2. Prompt engineering (Enginyeria d'instruccions)	5](#prompt-engineering-\(enginyeria-d'instruccions\))

[2.2.1. Què és un prompt?	6](#què-és-un-prompt?)

[2.2.2. Com es construeix un prompt	6](#com-es-construeix-un-prompt)

[2.3. Arquitectura del model institucional: System Prompts vs. User Prompts	7](#arquitectura-del-model-institucional:-system-prompts-vs.-user-prompts)

[2.3.1. User Prompt	7](#user-prompt)

[2.3.2. System Prompt	7](#system-prompt)

[2.4. Integració amb bases de dades escolars	8](#integració-amb-bases-de-dades-escolars)

[**3\. La IA aplicada a l'educació i l'aprenentatge adaptatiu	9**](#heading=h.psj8iaizi6g6)

[3.1. L'aprenentatge adaptatiu	9](#l'aprenentatge-adaptatiu)

[3.2. L'estat actual de la IA a les aules envers el model proposat	10](#l'estat-actual-de-la-ia-a-les-aules-envers-el-model-proposat)

[3.3. Beneficis d’utilitzar la IA generativa a les aules	11](#beneficis-d’utilitzar-la-ia-generativa-a-les-aules)

[3.4. Riscos tècnics i pedagògics	12](#riscos-tècnics-i-pedagògics)

[**4\. Fonaments pedagògics: Adaptació i control institucional	13**](#fonaments-pedagògics:-adaptació-i-control-institucional)

[4.1. Desenvolupament cognitiu a l'adolescència	13](#desenvolupament-cognitiu-a-l'adolescència)

[4.2. Adaptació del llenguatge i l'estil	14](#4.2.-adaptació-del-llenguatge-i-l'estil)

[4.3. Alineació curricular departamental (Guardrails)	15](#4.3.-alineació-curricular-departamental-\(guardrails\))

[**5\. El context de Catalunya: Ètica, privacitat i viabilitat	16**](#heading=h.pm6hsvttedjb)

[5.1. El Pla d'Educació Digital de Catalunya	16](#5.1.-el-pla-d'educació-digital-de-catalunya)

[5.2. El Reglament General de Protecció de Dades (RGPD) en l'entorn escolar	17](#5.2.-el-reglament-general-de-protecció-de-dades-\(rgpd\)-en-l'entorn-escolar)

[5.3. El dilema ètic: Privacitat vs. Equitat educativa	18](#5.3.-el-dilema-ètic:-privacitat-vs.-equitat-educativa)

[5.4. Conclusió teòrica de la viabilitat	19](#5.4.-conclusió-teòrica-de-la-viabilitat)

[1\. Estadi sensoriomotor (0 a 2 anys)	21](#1.-estadi-sensoriomotor-\(0-a-2-anys\))

[2\. Estadi preoperacional (2 a 7 anys)	21](#2.-estadi-preoperacional-\(2-a-7-anys\))

[3\. Estadi de les operacions concretes (7 a 11-12 anys)	21](#3.-estadi-de-les-operacions-concretes-\(7-a-11-12-anys\))

[4\. Estadi de les operacions formals (a partir dels 12 anys)	21](#4.-estadi-de-les-operacions-formals-\(a-partir-dels-12-anys\))

1. # **Introducció**  {#introducció}

   1. ## **Per què he escollit aquest tema?** {#per-què-he-escollit-aquest-tema?}

L'augment de l'ús de la intel·ligència artificial (IA) generativa durant els últims anys ha suposat un repte en gairebé tots els sectors de la societat inclós les escoles.

Com a alumne de segon de batxillerat, sé que la majoria d'alumnes utilitzem eines com ChatGPT de forma autònoma i, sovint, sense cap regulació ni adaptació pedagògica per part dels centres ni per part de les nostres famílies.

Aquest Treball de Recerca neix de la idea d'analitzar i anticipar el següent pas que sembla lògic i inevitable en el nostre sistema educatiu: la transició d'un ús lliure i descontrolat de la IA cap a un model institucionalitzat. Crec que a mitjà termini, el Departament d'Educació de la Generalitat de Catalunya hauria d'integrar aquesta tecnologia no només com un recurs extern que l'alumne busca a casa, sinó com una eina més**, segura i controlada des de les pròpies escoles**.

La motivació principal per triar aquest tema és la meva convicció que el veritable potencial de la IA a l'escola no ve de la seva capacitat per donar respostes o fer els deures, sinó en la capacitat que té per **personalitzar l'aprenentatge**. El sistema educatiu actual s'enfronta al repte constant d'atendre aules extremadament diverses, on cada alumne té un ritme, unes possibles dificultats d'aprenentatge i un nivell de maduresa completament diferents i comptar amb una eina que permeti personalitzar l’aprenentatge pot ajudar a aconseguir un nivell major d'èxit escolar a les aules. 

| El meu objectiu es plantejar un escenari on una IA centralitzada pugui adaptar la seva forma d'explicar el temari en funció de si es dirigeix a un alumne de primer d'ESO o a un de batxillerat, llegint el seu expedient i respectant estrictament les normatives de cada departament didàctic. |
| :---- |

2. ## **Hipòtesi de partida** {#hipòtesi-de-partida}

Com he comentat a l’apartat anterior, la hipòtesi principal d'aquest Treball de Recerca és que, en un futur pròxim, el Departament d'Educació de la Generalitat de Catalunya implementarà un sistema d'intel·ligència artificial tancat i institucionalitzat que substituirà l'ús genèric i no regulat de les eines d'IA.

Aquesta IA creuarà, de manera automatitzada i en temps real, dues fonts d'informació:

1. **Dades de l’alumne:** Les bases de dades internes de l'administració (com l'actual plataforma Esfer@[^1]) proporcionaran a la IA l'expedient de l'estudiant, el curs al qual pertany (per exemple, 1r d'ESO, 2n de Batxillerat,...) i,sempre que existeixi un consentiment exprés de la família, el seu perfil cognitiu o possibles necessitats específiques de suport educatiu (NESE)

2. **Normatives de cada departament didàctic (*System Prompts*):** Les directrius pedagògiques de cada institut estaran programades de forma oculta en el sistema. Així, cada departament didàctic establirà les regles metodològiques, actuant com a barreres de seguretat que dictaran com la IA ha d'ensenyar i què no pot fer (com ara donar solucions directes als problemes sense aplicar el mètode socràtic).

A partir d'aquesta premissa tecnològica, el meu TR es basa en que la introducció d'un mateix requeriment per part de l'alumne (el *User Prompt*, com ara l'ajuda per fer uns deures concrets) generarà **explicacions radicalment diferents  tant en vocabulari, nivell d’informació , llargada i to**, demostrant una adaptabilitat pedagògica absoluta segons l'edat i les capacitats del receptor.

Paral·lelament, aquest TR  planteja una **subhipòtesi de caràcter ètic i legal**: donat que el grau d’adaptació de la IA a l’alumne dependrà directament de la quantitat d'informació personal i mèdica que se li proporcioni (com ara un diagnòstic de TDAH o dislèxia), el model de la Generalitat s'enfrontarà a un dilema de privacitat. És lògic pensar que la negativa d'algunes famílies a cedir aquestes dades de salut per alimentar l'algoritme generarà una disparitat en la qualitat de l'assistència virtual.

3. ## **Objectius** {#objectius}

Els principals objectius d’aquest Treball de Recerca serien els següents:

**Objectiu principal:**

- Avaluar de forma pràctica la capacitat d'una intel·ligència artificial generativa per adaptar el seu mètode d'ensenyament a diferents perfils d'alumnes.

**Objectius específics**

- **Definir l'arquitectura teòrica** d'un model d'IA tancat, establint la diferència tècnica i funcional entre les instruccions docents ocultes (*System Prompts*) i les consultes directes dels alumnes (*User Prompts*).

- **Dissenyar i executar una simulació pràctica** mitjançant la creació de perfils d'estudiants amb diferent edat i maduresa cognitiva, per tal de contrastar i avaluar empíricament les diferències en les explicacions generades per la IA davant d'una mateixa comanda escolar.

- **Comprovar l'efectivitat de les barreres de seguretat (*guardrails*)** aplicades, garantint que la IA actua com un guia pedagògic (per exemple, forçant l'ús del mètode socràtic) i no com una simple eina per resoldre deures.

Per a aconseguir aquests objectius aquest treball s’estructura en una part teòrica en la s’explica el funcionament de la IA (tipus, prompts…) i una part més pràctica amb una simulació de dos estudiants ficticis de dos cursos diferents. 

2. # **Introducció a la Intel·ligència Artificial (IA) i Arquitectura del Sistema** {#introducció-a-la-intel·ligència-artificial-(ia)-i-arquitectura-del-sistema}

   1. ## **Què és la IA Generativa i el Processament del Llenguatge Natural (PLN)** {#què-és-la-ia-generativa-i-el-processament-del-llenguatge-natural-(pln)}

La intel·ligència artificial (IA) tradicional s'ha centrat durant dècades a analitzar dades i fer prediccions, com ara classificar el correu brossa o recomanar contingut audiovisual. Però, la tecnologia que impacta directament en el sistema educatiu actual és una modalitat de IA molt més recent i disruptiva: la **Intel·ligència Artificial Generativa**. Aquest tipus d'IA no es limita a endreçar o cercar informació existent, sinó que té la capacitat de crear contingut totalment nou, coherent i original (text, imatges, codi) a partir dels patrons que ha après durant el seu entrenament.

Perquè aquesta IA pugui entendre les preguntes dels alumnes i respondre de manera lògica, s'utilitza una te4cnologia anomenada **Processament del Llenguatge Natural (PLN)**. El PLN és una disciplina que uneix la informàtica, la intel·ligència artificial i la lingüística. El seu objectiu principal és dotar les màquines de la capacitat d'entendre, interpretar i manipular el llenguatge humà, permetent que la comunicació es faci de manera conversacional, sense necessitat de codi informàtic.

El que fa funcionar aquest PLN són els **Models de Llenguatge Extens (LLM, per les sigles en anglès de *Large Language Models*)**. Aquests sistemes[^2], han estat entrenats amb volums massius de text (llibres, articles acadèmics, pàgines web…) i gràcies a xarxes neuronals artificials[^3] complexes, l'LLM no busca les respostes en una base de dades estàtica, sinó que funciona per probabilitat, és a dir, avalua el context de la conversa i calcula quina és la següent paraula més lògica i precisa per construir una resposta coherent.

| El LLM és el que permet que la IA pugui redactar una explicació totalment diferent si sap que es dirigeix a un alumne de dotze anys o a un de divuit. |
| :---- |

2. ## **Prompt engineering (Enginyeria d'instruccions)** {#prompt-engineering-(enginyeria-d'instruccions)}

Un factor a tenir en compte, es que l'eficàcia d'un Model de Llenguatge Extens (LLM) no depèn únicament de la seva capacitat de processament o de la quantitat de dades amb què ha estat entrenat, sinó de la manera com interactuem amb ell. Aquí és on pren protagonisme un nou concepte, el ***prompt engineering*** o enginyeria d'instruccions. 

1. ### **Què és un prompt?** {#què-és-un-prompt?}

Un *prompt* és el text, la pregunta o l'ordre que s'introdueix a la plataforma d'IA per sol·licitar-li una tasca. Per tant, el prompt engineering és la tècnica de dissenyar, estructurar i optimitzar aquestes ordres per guiar la IA cap al resultat més precís, útil i adequat possible.

Com ja he comentat en l'apartat anterior, els LLM funcionen predient quina paraula va a continuació basant-se en el context. El *prompt* és l'element fonamental que construeix aquest context i per això és tan important el prompt engineering . Si la instrucció és vaga (per exemple: "Explica'm la Revolució Francesa"), la IA oferirà una resposta estàndard, similar a un resum d'enciclopèdia. Però si s'aplica l'enginyeria d'instruccions i es detalla la petició ("Ets un professor d'història. Explica la Revolució Francesa a un nen de deu anys utilitzant un to divertit i metàfores amb jocs de pati"), la IA altera completament el seu càlcul de probabilitats, descarta el llenguatge acadèmic i genera una explicació a mida.

2. ### **Com es construeix un prompt** {#com-es-construeix-un-prompt}

Un prompt sol contenir quatre elements clau:

- **El rol:** Quina identitat ha d'assumir la IA (un professor de matemàtiques, un avaluador extern, un tutor empàtic…).

- **El context:** La informació de fons necessària (l'edat de l'alumne, els seus coneixements previs o les seves dificultats).

- **La tasca:** L'acció específica que ha de dur a terme (explicar un concepte, corregir un text, donar pistes sense resoldre el problema…).

- **El format o les restriccions:** Com ha de presentar la informació (un paràgraf breu, una llista o l'obligació de no donar mai la solució final, per exemple).


| L'existència del *prompt engineering* demostra que la IA generativa és una tecnologia totalment adaptable i és el que permetrà dissenyar l'arquitectura del sistema institucional educatiu que es planteja en aquest TR. |
| :---- |

  3. ## **Arquitectura del model institucional: System Prompts vs. User Prompts** {#arquitectura-del-model-institucional:-system-prompts-vs.-user-prompts}

Tots coneixem com funcionen les plataformes obertes i comercials com el ChatGPT estàndard: la interacció és directa i gairebé sense filtres. Però, en un model institucionalitzat, això no es possible, es requereix una arquitectura de capes per garantir el control pedagògic. Aquesta arquitectura es basa en la separació estricta entre el *User Prompt* i el *System Prompt*.

1. ### **User Prompt** {#user-prompt}

Es la instrucció de l’usuari, allò que l'estudiant escriu a la caixa de text, és a dir la petició directa i visible. Per exemple, un alumne podria demanar el següent:

*"No entenc com resoldre aquesta equació de segon grau: x² \- 5x \+ 6 \= 0, dona'm la solució"*. 

Si la IA només depengués d'aquest User Prompt, la màquina es limitaria a obeir l'alumne i li donaria el resultat final, anul·lant l'esforç i el procés d'aprenentatge.

2. ### **System Prompt** {#system-prompt}

Per evitar situacions com l’exemple del punt anterior, els sistemes professionals utilitzen el **System Prompt** (instrucció del sistema). Aquesta és una capa d'instruccions oculta i preconfigurada pels programadors (en aquest cas, el Departament d'Educació i el professorat) que l'usuari final no pot veure ni modificar. El *System Prompt* s'executa sempre en segon pla abans de llegir el *User Prompt*, i actua com el "cervell rector" que defineix la identitat, les normes i els límits absoluts de la intel·ligència artificial.

En l'arquitectura teòrica que planteja aquest TR, cada departament didàctic d'una escola o institut redactaria el seu propi *System Prompt*. Així, continuant amb l’exemple anterior, abans que la IA llegeixi la pregunta de l'alumne sobre l'equació, ja hauria rebut i assumit una ordre interna semblant a aquesta:

*"Ets el tutor virtual de matemàtiques de l'escola X. Estàs parlant amb un alumne de 3r d'ESO. La teva norma inamovible és que MAI pots donar el resultat final d'un problema matemàtic. Has d'aplicar el mètode socràtic: si l'alumne et demana la solució, respon amb una pregunta que el faci reflexionar sobre quin és el primer pas de la fórmula. Ho has de fer amb un to que el faci sentir-se capaç d’aconseguir-ho."*

| Quan l'algoritme fusiona el *System Prompt* (la norma del professor) amb el *User Prompt* (el que ha preguntat l’alumne), la resposta resultant s'alinea perfectament amb els objectius pedagògics del centre educatiu.  |
| :---- |

Aquesta separació és la clau que permetrà a la Generalitat transformar una eina genèrica de generació de text en un assistent educatiu segur, normatiu i totalment controlat.

4. ## **Integració amb bases de dades escolars** {#integració-amb-bases-de-dades-escolars}

Però la idea és que la IA s’adapti a cada alumne. Per això, per aconseguir que l'arquitectura basada en els *System Prompts* funcioni realment, la instrucció oculta no pot ser estàtica; ha d'estar personalitzada per a cada persona. Per fer-ho possible, la IA no pot funcionar sola de manera aïllada, sinó que ha d’estar sincronitzada mitjançant interfícies de programació (API)[^4] amb les bases de dades internes del Departament d'Educació (com per exemple la plataforma de gestió *Esfer@*).

D’aquesta manera, quan un alumne accedeix a l'assistent virtual amb les seves credencials institucionals, el sistema connecta amb les bases de dades del Departament d’Educació i realitza una consulta automatitzada al seu expedient acadèmic. El programa extreu un conjunt de metadades clau com son l'edat i el curs de l'estudiant, el seu historial de qualificacions i, sempre que existeixi el consentiment familiar, el seu perfil cognitiu o les possibles Necessitats Específiques de Suport Educatiu (NESE), com ara un diagnòstic de TDAH, dislèxia o altes capacitats.  I tot això passa en qüestió de mil·lisegons. Aquestes metadades s'injecten de manera dinàmica dins del *System Prompt* abans que l'alumne tingui temps d'escriure la seva primera consulta (només pel fet d’accedir a l’assistent virtual). 

Amb això hem aconseguit que la regla general del departament didàctic es fusioni amb el perfil específic de l'usuari i que abans de començar a escriure, la IA ja hagi interioritzat una instrucció híbrida entre la informació de la base de dades del Departament d’Educació i les instruccions de l’escola, com per exemple: 

*"Aplica les normes del departament de ciències per a un alumne de 1r d'ESO amb dislèxia diagnosticada: utilitza frases curtes, vocabulari accessible i estructura les explicacions amb llistes de punts per facilitar-ne la lectura"*.

| Aquesta connexió invisible i en temps real entre l'expedient de l'alumne i el Model de Llenguatge Extens (LLM) és l'element tecnològic que permet passar d'una educació estandarditzada a una autèntica personalització massiva. La màquina no només sap què ha d'ensenyar gràcies a les barreres de seguretat dels professors, sinó *a* qui li hi està explicant, adaptant-se automàticament sense que l'alumne hagi de configurar res. |
| :---- |

3. # **La IA aplicada a l'educació i l'aprenentatge adaptatiu**

   1. ## **L'aprenentatge adaptatiu** {#l'aprenentatge-adaptatiu}

Històricament, el sistema educatiu tradicional s'ha fonamentat en un model acadèmic estandarditzat que consisteix en que el mestre imparteix els mateixos continguts, al mateix ritme i amb la mateixa metodologia per a tota la classe, és a dir per a tots els alumnes. Aquest enfocament xoca amb la realitat de les escoles: els diferent  ritmes d'aprenentatge, interessos, maduresa i capacitats dels alumnes..

L'aprenentatge adaptatiu neix precisament per donar resposta a aquesta necessitat. Si es busca la definició d’aprenentatge adaptatiu, el que surt és “metodologia educativa que utilitza la tecnologia i l'anàlisi de dades per ajustar, de manera dinàmica i continuada, la presentació de la informació i les activitats a les necessitats individuals de cada estudiant”. El problema és que, fins ara, la seva aplicació a gran escala era impossible, ja que requeria una atenció individualitzada, o el que és el mateix, un tutor per a cada alumne.

És en aquest punt on l’aparició de la intel·ligència artificial generativa pot canviar la situació. L'arquitectura explicada en el apartat anterior permet fer realitat allò que s'anomena la **personalització massiva**. Gràcies al creuament de dades en temps real i a la flexibilitat del Processament del Llenguatge Natural (PLN), la IA pot ser aquest "tutor particular".

I això implica que el material didàctic deixa de ser únic i igual per a tots. Si un alumne comprèn ràpidament un concepte, per exemple de física, l'assistent virtual pot augmentar-ne la dificultat o proposar reptes superiors; per contra, si el sistema detecta o té registrat que un altre estudiant li costa entendre-ho, pot reduir el nivell, utilitzar exemples més propers al seu dia a dia o dividir l'explicació en passos molt més petits.

2. ## **L'estat actual de la IA a les aules envers el model proposat** {#l'estat-actual-de-la-ia-a-les-aules-envers-el-model-proposat}

Actualment, la presència de la intel·ligència artificial a les aules de secundària i batxillerat es caracteritza per un ús reduït i desregulat. Els estudiants utilitzen IA’s com Chat GPT o Claude de forma individual, generalment des de casa i sense supervisió. Aquests models oberts operen com a assistents coneguts com “generalistes”, ja que no tenen cap context sobre qui els està fent servir, desconeixen el currículum escolar i no estan programats per ensenyar, sinó per complaure l'usuari de la manera més ràpida possible. Així si un estudiant demana a Chat GPT que l’ajudi amb un problema, la IA resoldrà la tasca de manera directa, fent-li els deures i no estimulant-lo a resoldre’ls per ell mateix.

Si mirem la part de les escoles, en la majoria de casos l'ús de la IA es limita principalment a la reducció de la càrrega burocràtica, la redacció de correus o la creació de materials didàctics genèrics. No hi ha res que connecti les intencions pedagògiques de l'escola amb l'eina tecnològica que utilitza l'estudiant. És a dir, la institució i la intel·ligència artificial viuen completament d'esquena.

I aquesta és la situació que aquest TR planteja canviar. Mentre que en actualment l'alumne dirigeix la IA cap a la llei del mínim esforç (és a dir obtenir la resposta final sense necessitat d’entendre el procés) , en el model proposat és l’escola qui pren el control de l'algoritme. L'existència d'un *System Prompt* dictat pels departaments didàctics obliga la màquina a abandonar el seu rol de "resolutora de tasques" per adoptar el de "tutor". Dit d’una altre manera es planteja passar d'una relació d’intercanvi d’informació entre l'estudiant i la pantalla, a una relació pedagògica triangular on hi participen l'alumne, la intel·ligència artificial i les directrius del centre educatiu. El sistema hipotètic de la Generalitat no requeriria aportar un model d'IA tecnològicament més avançat que els comercials, sinó un model pedagògicament guiat i blindat per complir amb els objectius de l'educació pública catalana.

### 

### 

3. ## **Beneficis d’utilitzar la IA generativa a les aules** {#beneficis-d’utilitzar-la-ia-generativa-a-les-aules}

L'adopció d'una intel·ligència artificial institucionalitzada i connectada a les dades acadèmiques suposa un canvi radical que aporta beneficis tant per als 'alumnes com per al sistema educatiu. 

Els principals beneficis d'implementar aquesta arquitectura tecnològica son:

- **Personalització del ritme de treball**: L'adaptació automàtica de la complexitat, el vocabulari i la llargada de les explicacions permet que cada estudiant rebi la informació en el format que millor pot assimilar. Això redueix la frustració dels alumnes que requereixen més temps per integrar els conceptes i, paral·lelament, estimula a 'aquells que tenen un ritme d'aprenentatge superior. La idea és estudiar no suposi ni per un ni per l'altre un problema.

- **Atenció integral a la diversitat (NESE)**: al integrar-se amb l'expedient de l'alumne, la IA pot aplicar mesures compensatòries automàtiques (com per exemple adaptar els enunciats en passos curts per a un alumne amb TDAH, o modificar visualment la informació mitjançant llistes per a un alumne amb dislèxia) sense que l'estudiant hagi d'exposar públicament les seves dificultats.

- **Garantia de compliment normes educatives**: El control institucional mitjançant les instruccions ocultes (System Prompts) evita el risc que la tecnologia faci la feina de l'estudiant. Al fer que la màquina actuï sota el mètode socràtic o complint restriccions estrictes dels departaments, es garanteix que l'alumne hagi d'esforçar-se per arribar a la solució, desenvolupant així el seu pensament crític i la seva autonomia.

- **Ajuda al professorat**: Aquest ecosistema no pretén, en cap cas, substituir la figura del professor, sinó que vol ser una ajuda per a que pugui centrar-se en els seus alumnes proporcionant-li mètriques precises que li permetin detectar mancances globals i reforçar-les al dia següent a classe amb intervencions humanes de molt més valor pedagògic (per exemple, si un 40% de l'aula de 3r d'ESO està preguntant a la IA sobre un mateix tipus d'equació a casa).

| L'ús de la IA en l’àmbit educatiu permet l’adaptació a la diversitat de les aules, adequant-se al ritme d’aprenentatge i necessitats de cada alumne garantint el compliment de les normes educatives així com sent una gran ajuda al professorat per poder centrar-se en els aspectes que més necessitin els seu alumnes.  |
| :---- |

  4. ## **Riscos tècnics i pedagògics** {#riscos-tècnics-i-pedagògics}

La implementació d'aquesta tecnologia no està exempta de riscos. Qualsevol projecte tecnològic institucional ha de contemplar i preveure les debilitats tècniques i els efectes adversos sobre el desenvolupament cognitiu de l'alumnat.

Hi ha quatre grans riscos que caldrà mitigar:

- **Les al·lucinacions de la IA**: Com s'ha explicat en l'apartat 2.1 aquests models generen text calculant probabilitats, no buscant dades en un arxiu exacte. Això provoca un fenomen tècnic conegut com a "al·lucinacions", en què la IA inventa informació o dades falses i les presenta amb un to de total seguretat i autoritat. En l'entorn escolar, aquest risc és molt important, un alumne de 1r d'ESO, que encara no té una base sòlida de coneixements previs, no té capacitat per detectar si la IA s'ha inventat un fet històric o una fórmula física, assumint l'error com una veritat absoluta.

- **La dependència tecnològica (l'efecte GPS)**: Disposar d'un tutor particular les vint-i-quatre hores del dia pot generar una dependència excessiva. De la mateixa manera que l'ús del GPS ens fa perdre el sentit de l'orientació, delegar la resolució de dubtes constantment a la màquina pot atrofiar la capacitat de l'alumne per enfrontar-se a la frustració i resoldre problemes de manera autònoma. Si la tecnologia falla o no hi és present, l'estudiant podria sentir-se incapaç d'avançar.

- **Debilitament del pensament crític**: és veritat que els System Prompts poden obligar la IA a fer servir el mètode socràtic en matèries com matemàtiques però en altres àmbits (com ara la generació d'idees per a una redacció o el resum d'un llibre) l'alumne podria acostumar-se a acceptar el primer raonament que li ofereix la màquina. Això suposa un perill evident per a la maduració del pensament crític donat que el debat intern, el dubte i la reflexió profunda són elements essencials de l'aprenentatge humanístic.

- **Biaixos algorítmics:** La IA s'entrena amb milions de dades extretes d'internet, les quals reflecteixen els prejudicis, els estereotips i les visions culturals dominants. Malgrat posar barreres institucionals, l'algoritme podria reproduir biaixos de gènere o donar visions esbiaixades sobre esdeveniments històrics i socials, un fet que entra en conflicte directe amb els valors d'objectivitat, pluralitat i equitat que ha de garantir l'escola pública catalana.

| Aquests riscos demostren que la IA educativa no pot funcionar sense la supervisió del professor, no pot  ser mai una tecnologia autònoma. La figura del professor esdevé clau en l’èxit d’aquest sistema.  |
| :---- |

4. # **Fonaments pedagògics: Adaptació i control institucional** {#fonaments-pedagògics:-adaptació-i-control-institucional}

   1. ## **Desenvolupament cognitiu a l'adolescència** {#desenvolupament-cognitiu-a-l'adolescència}

Per entendre per què la IA ha d’adaptar-se a l’edat i capacitats de l’alumne, és necessari  entendre la distància cognitiva que separa els dos extrems de l'educació secundària: és a dir, un alumne de 1r d'ESO i un alumne de 2n de Batxillerat. Tal com fonamenten Piaget i Inhelder[^5], és a partir de l'adolescència quan l'individu assoleix l'estadi de les operacions formals; dit d’una manera més senzilla, l’adolescència és el moment en el que l'alumne comença a raonar sobre hipòtesis, deduccions i conceptes totalment abstractes. Però no és un canvi radical, és un procés. A nivell psicològic i cognitiu no és el mateix un alumne de 1r d’ESO que un de 2n de Batxillerat, la seva forma de processar la informació és radicalment diferent. En concret:

- **Alumne de 1r d'ESO (12 anys)**: es troba en una fase de transició. Tot i que comença a entendre conceptes abstractes, el seu aprenentatge encara depèn en gran mesura del pensament concret i de la seva experiència immediata. La seva capacitat d'atenció sostinguda és menor. A nivell pedagògic, necessita instruccions fragmentades pas a pas, oracions curtes, vocabulari assequible i, sobretot, l'ús constant de metàfores o analogies visuals vinculades al seu dia a dia (l'esport, els videojocs, la natura) per poder entendre idees complexes.

- **Alumne 2n de Batxillerat (17-18 anys):** Aquesta edat es caracteritza per la consolidació plena del pensament abstracte i logico-deductiu. L'estudiant té la capacitat de formular hipòtesis, analitzar múltiples variables simultàniament i processar raonaments filosòfics o científics profunds sense necessitat de referències visuals o exemples quotidians. La seva riquesa lèxica li permet assimilar amb fluïdesa el llenguatge tècnic, formal i acadèmic propi de l'etapa preuniversitària, i és capaç de llegir i processar textos molt més densos i llargs.

Aquesta diferència madurativa és la base teòrica que justifica l'experiment pràctic d'aquest Treball de Recerca. L'explicació d'un mateix concepte acadèmic no pot ser igual per a tots; obligar a un alumne de dotze anys a llegir un text de nivell preuniversitari genera frustració, mentre que tractar un alumne de divuit anys amb exemples infantils genera desmotivació.

| El valor del sistema proposat seria, precisament, la capacitat de la màquina per llegir l'edat de l'alumne i ajustar el nivell d'abstracció de forma automàtica. |
| :---- |

 

## **4.2. Adaptació del llenguatge i l'estil** {#4.2.-adaptació-del-llenguatge-i-l'estil}

L'aplicació pràctica de les teories del desenvolupament cognitiu de Piaget a través d'un Model de Llenguatge Extens (LLM) implica una transformació total de l'estil comunicatiu. La intel·ligència artificial no només ha d'avaluar quina informació proporciona, sinó com la presenta, ajustant el lèxic, la sintaxi i els recursos retòrics a l'estadi maduratiu de l’alumne. Aquesta variació estilística és precisament el que legitima l'ús de la IA com a eina pedagògica personalitzada.

En un sistema institucionalitzat com el que es proposa, el creuament del System Prompt amb l'expedient de l'alumne obligaria l'algoritme a generar respostes amb dues configuracions totalment oposades:

- **Configuració per a un alumne de 1r d'ESO (Operacions concretes / Transició):** com s’ha vist en el punt anterior un alumne de dotze anys necessita suport per entendre l'abstracció i té una capacitat d'atenció sostinguda menor, per aquesta raó, la IA ha d'adoptar un estil altament estructurat, amb oracions curtes per evitar la sobrecàrrega cognitiva i un vocabulari senzill. Si per alguna raó és obligatori introduir un tecnicisme, la màquina l'ha de definir immediatament. A més, el discurs s'ha de recolzar fonamentalment en analogies visuals o metàfores lligades al món real (situacions quotidianes, tecnologia d'ús diari, etc.). Finalment, l'estil requerirà presentacions visuals amigables, com ara llistes breus (punts o vinyetes) i un to marcadament empàtic que inclogui reforç positiu constant per mantenir la motivació.

- **Configuració per a 2n de Batxillerat (Operacions formals):** Quan el sistema interactua amb un alumne de disset o divuit anys, l'estil fa un salt qualitatiu i es torna molt més acadèmic i rigorós (no oblidem que estem davant d’un preuniversitari). L'alumne ja no necessita el reforç de metàfores quotidianes per entendre processos complexos, de manera que la IA pot eliminar l'excés d'analogies visuals. La sintaxi passa a admetre oracions subordinades complexes, i el vocabulari ha de ser tècnic, formal i propi de la matèria. El to evoluciona cap a l'objectivitat, prioritzant el raonament i preparant l'estudiant per al rigor lèxic de l'etapa universitària.

Aquesta diferenciació estilística no és només teòrica, sinó que constitueix el nucli de la hipòtesi d'aquest Treball de Recerca. La viabilitat del sistema depèn de la capacitat de l'algoritme per executar aquesta adaptació. Precisament, la part pràctica d'aquesta investigació se centrarà a demostrar de manera empírica com una IA generativa actual és capaç de canviar automàticament aquests paràmetres lèxics i estructurals davant d'una mateixa pregunta escolar.

## **4.3. Alineació curricular departamental (Guardrails)** {#4.3.-alineació-curricular-departamental-(guardrails)}

Si el perfil de l'alumne defineix l'estil i el to de la intel·ligència artificial, són els departaments educatius de l'institut o l’escola els encarregats de marcar-ne els límits ètics i de procediment. Aquests límits inamovibles es coneixen com a **guardrails** (barreres de seguretat o límits de contenció). Es tracta d'instruccions restrictives incrustades dins del System Prompt que l'algoritme no pot desobeir sota cap circumstància, per molt que l'usuari (User Prompt) insisteixi.

Actualment, el principal risc pedagògic de permetre l'accés obert a la IA és l'anul·lació de l'esforç cognitiu; és a dir, que l'alumne utilitzi l'eina simplement perquè li faci els deures. Per evitar-ho, el sistema hipotètic de la Generalitat atorgaria a cada escola i a cada departament (Matemàtiques, Llengua, Ciències, etc.) la potestat de programar els seus propis guardrails, alineant el comportament de la màquina amb els principis i la metodologia del centre.

L'aplicació d'aquestes barreres de seguretat transformaria la IA d'una "màquina de resoldre tasques" a un "facilitador de l'aprenentatge". Alguns exemples pràctics d'aquesta alineació serien:

- **Matemàtiques:** el departament podria establir un guardrail que prohibeixi explícitament a la IA proporcionar el resultat numèric final d'una operació o equació. La instrucció oculta obligaria la màquina a aplicar el mètode socràtic: si l'alumne introdueix un problema geomètric i demana la solució, la IA hauria de respondre amb una pregunta (per exemple: "Per calcular l'àrea d'aquest triangle, primer necessitem saber-ne la base. Quina dada de l'enunciat creus que ens indica la base?"), guiant l'estudiant pas a pas fins que ell mateix dedueixi la resposta.

- **Llengües:** el departament podria configurar el sistema perquè, quan un alumne pugi l'esborrany d'una redacció, la IA no reescrigui el text corregint-ne les faltes d'ortografia i la sintaxi (fet que impediria que l'alumne aprengués dels seus errors). En el seu lloc, el guardrail obligaria la màquina a actuar com un avaluador formatiu: "Tens tres errors de concordança al segon paràgraf i dues paraules mal accentuades. Revisa-ho i torna'm a enviar el text".

| El control mitjançant guardrails garanteix que la IA no intervingui de manera negativa en el procés d'aprenentatge, sinó que es converteixi en una extensió virtual de les normes i criteris d'avaluació que el professorat ja aplica a classe, és a dir, que actuï com un professor més. D'aquesta manera, l'ús de la tecnologia deixa de ser una via per fer trampes i passa a ser una eina d'estudi rigorosa i regulada. |
| :---- |

5. # **El context de Catalunya: Ètica, privacitat i viabilitat**

## **5.1. El Pla d'Educació Digital de Catalunya** {#5.1.-el-pla-d'educació-digital-de-catalunya}

Per avaluar la viabilitat real d'un ecosistema d'IA institucional, és important analitzar el punt de partida tecnològic de l'administració pública, és a dir, com estan actualment de digitalitzades les aules, ja que és imprescindible aquesta digitalització per poder implantar el sistema proposat. 

A Catalunya, el marc de referència actual és el Pla d'Educació Digital de Catalunya (PEDC)[^6], impulsat pel Departament d'Educació de la Generalitat.

Durant els últims anys, el PEDC ha centrat els seus esforços en tres grans eixos que actuen com a fonaments bàsics:

1. **La dotació d'infraestructures:** El repartiment massiu d'ordinadors portàtils a l'alumnat (a partir de l'ESO) i al professorat, així com la millora de la connectivitat de banda ampla a tots els instituts públics.

2. **La capacitació digital docent:** La formació del professorat perquè assoleixi la competència digital necessària per integrar la tecnologia a l'aula.

3. **Els Entorns Virtuals d'Aprenentatge (EVA) i la gestió de dades:** La consolidació de plataformes educatives (com Moodle o Google Workspace) i de sistemes de gestió de dades centralitzats (com l'aplicatiu Esfer@, on es guarden els expedients acadèmics i personals de tot l'alumnat català).

| Això significa que la infraestructura física i informàtica necessària per sostenir una IA institucional ja existeix. La Generalitat ja disposa dels dispositius a les aules (el "hardware") i de les bases de dades amb el perfil de l'alumne (el "software" de gestió). |
| :---- |

Per tant, el sistema d'aprenentatge adaptatiu i els System Prompts que proposa aquesta investigació no representen una utopia tecnològica, sinó l'evolució del Pla d'Educació Digital de Catalunya. Un cop superada la fase de digitalitzar les aules (posar pantalles), el pas següent de l'administració haurà de ser dotar aquestes eines d'"intel·ligència" perquè deixin de ser simples suports de lectura o escriptura i es converteixin en assistents pedagògics actius.

## **5.2. El Reglament General de Protecció de Dades (RGPD) en l'entorn escolar** {#5.2.-el-reglament-general-de-protecció-de-dades-(rgpd)-en-l'entorn-escolar}

Si bé la infraestructura tecnològica per sostenir aquest projecte ja existeix a Catalunya, el principal problema per a la implementació d'un sistema d'aprenentatge adaptatiu massiu no és informàtic, sinó jurídic. Com s'ha exposat en la formulació de la hipòtesi, perquè la intel·ligència artificial pugui actuar com un tutor veritablement personalitzat, necessita llegir en temps real l'expedient de l'alumne i, quan sigui necessari, conèixer els seus diagnòstics d'aprenentatge (com ara el Trastorn per Dèficit d'Atenció i Hiperactivitat \-TDAH-, la dislèxia o el Trastorn de l'Espectre Autista \-TEA-).

Dins del marc legal europeu i espanyol, el Reglament General de Protecció de Dades (RGPD) i la Llei Orgànica de Protecció de Dades i Garantia dels Drets Digitals (LOPDGDD) són extremadament rigorosos amb el tractament de la informació de menors. Aquestes lleis classifiquen qualsevol diagnòstic psicopedagògic o cognitiu com a "dades de categoria especial"[^7] (dades de salut), atorgant-los el nivell màxim de protecció legal possible.

Aquesta categorització jurídica imposa limitacions molt severes al model institucional proposat:

- La prohibició de l'automatisme i l'obligatorietat del consentiment: El Departament d'Educació no podria connectar la base de dades d'Esfer@ amb la IA de manera automàtica per a tot l'alumnat. La llei exigeix un consentiment explícit, informat i inequívoc per part de les famílies o tutors legals abans que qualsevol algoritme pugui processar informació mèdica d'un menor.

- La sobirania de les dades i l'entorn tancat: Per complir amb el RGPD, la Generalitat estaria totalment inhabilitada per utilitzar les versions públiques i obertes d'eines com ChatGPT o Gemini. Enviar el perfil cognitiu d'un menor a servidors privats estrangers, on aquestes dades podrien ser emmagatzemades i utilitzades per entrenar futurs models de llenguatge, suposaria una vulneració de la llei. Això obligaria el Govern a desplegar la IA en un entorn informàtic de "núvol privat" o en servidors propis (en local), garantint que les dades de salut s'eliminen de la memòria temporal de la màquina un cop generada la resposta.

En definitiva, l'aplicació d'aquesta tecnologia als instituts i escoles té com a barrera la privacitat. Malgrat l'objectiu de cedir aquestes dades a la IA sigui exclusivament pedagògic i beneficiós per a l'alumne (per adaptar els textos a la seva dislèxia, per exemple), el recel lògic cap al tractament algorítmic de dades tan íntimes obre la porta a un conflicte profund entre allò que la tecnologia pot fer i allò que la societat està disposada a permetre.

## **5.3. El dilema ètic: Privacitat vs. Equitat educativa** {#5.3.-el-dilema-ètic:-privacitat-vs.-equitat-educativa}

L'obligatorietat legal d'obtenir el consentiment familiar per al tractament de dades mèdiques i cognitives planteja l'escenari més complex d'aquest model institucional. Davant la petició del Departament d'Educació d'integrar el perfil complet de l'alumne dins del "cervell" de la intel·ligència artificial, la resposta de les famílies es dividiria inevitablement. El sistema hauria d'oferir un mecanisme clar on els pares poguessin donar el consentiment (opt-in) o, per contra, bloquejar l'accés a aquesta informació per preservar la intimitat del menor (opt-out).

Aquesta llibertat d'elecció, tot i ser un dret fonamental inqüestionable, genera un profund dilema ètic, que té l'equitat com a pilar fundacional. Donat que l'eficiència de la intel·ligència artificial adaptativa depèn directament de la qualitat i la quantitat de dades que rep, la negativa a cedir el perfil de l'alumne crearia automàticament una aula de dues velocitats:

- **L'alumne amb dades cedides:** Gaudiria de tot el potencial de la tecnologia. La IA actuaria com un tutor hiperpersonalitzat, detectant si l'estudiant té un trastorn de l'aprenentatge i modificant de manera proactiva els seus textos, la sintaxi o els exemples per compensar aquesta dificultat.

- **L'alumne amb dades bloquejades:** Interactuaria amb una IA genèrica i "cega". Tot i que el sistema continuaria aplicant les normes generals del departament didàctic (guardrails), no podria adaptar l'explicació a les mancances específiques d'aquell alumne. Si aquest alumne tingués dislèxia o un nivell de maduresa inferior, la màquina no ho sabria i li lliuraria textos que li podrien resultar incomprensibles o frustrants.

Aquest fet suposa l'aparició d'una nova bretxa educativa basada en les dades. Ja no parlem d'una desigualtat per falta d'ordinadors o de recursos econòmics, sinó d'un desavantatge acadèmic provocat per l'exercici del dret a la privacitat.

| El dilema culmina en una paradoxa difícil de resoldre: la decisió familiar de protegir la intimitat mèdica de l'adolescent podria acabar perjudicant el seu rendiment escolar respecte als companys que sí que han permès que l’IA els analitzi. La gestió d'aquesta problemàtica (el dret de la protecció de dades personals envers el dret a rebre l'educació més avançada i personalitzada possible) és, sens dubte, el gran repte que l'administració educativa haurà d'afrontar. |
| :---- |

## **5.4. Conclusió teòrica de la viabilitat** {#5.4.-conclusió-teòrica-de-la-viabilitat}

A mode de síntesi d'aquest marc teòric, és important respondre a la pregunta que següent:

é*s realista, a mitjà termini, que el Departament d'Educació de la Generalitat de Catalunya desenvolupi i implementi un ecosistema d'intel·ligència artificial d'aquestes característiques?*

Per respondre a aquesta pregunta, s’han de mirar tres aspectes fonamentals:  la viabilitat tecnològica i econòmica, la viabilitat legal  i ètica i la viabilitat institucional.

- **Viabilitat tecnològica i econòmica (Alta):** Des d'un punt de vista estrictament tecnològic, el sistema és factible avui dia. Com s'ha vist al punt 5.1 amb el Pla d'Educació Digital, els ordinadors (hardware) ja és a les aules. Pel que fa al "software", la Generalitat no necessita inventar una intel·ligència artificial des de zero (fet que costaria milers de milions d'euros). Podria utilitzar models de llenguatge de codi obert (open-source), allotjar-los en servidors propis del Govern (garantint així la sobirania de les dades i el compliment del RGPD) i connectar-los mitjançant APIs a la plataforma Esfer@. La tecnologia per crear System Prompts i creuar-los amb bases de dades ja és un estàndard en el sector empresarial; només falta aplicar-la a l'àmbit educatiu.

- **Viabilitat legal i ètica (Complexa, però resoluble):** Com s'ha exposat en el dilema de la privacitat (apartat 5.2), l'obstacle més gran no són els servidors, sinó les lleis. La viabilitat dependrà de la capacitat de l'administració per dissenyar un sistema de consentiment informat molt transparent. És probable que el sistema hagi de néixer amb un model híbrid: una IA altament adaptativa per a les famílies que facin l'opt-in (cedint dades cognitives), i una versió més neutra per a la resta. La clau jurídica serà garantir que les dades de l'alumne s'utilitzen només en el moment de la consulta i s'esborren immediatament, sense emmagatzemar-se per entrenar l'algoritme.

- **Viabilitat institucional (El veritable coll d'ampolla)**: El repte més lent serà el consens pedagògic. Determinar quins són els guardrails correctes exigirà un acord profund entre els departaments didàctics, inspecció educativa i professorat.

| Conclusió final del marc teòric: La implementació d'aquest model no només és realista, sinó molt necessari. La presència de la intel·ligència artificial a la societat no té marxa enrere, i l'educació no pot permetre's deixar una eina tan potent exclusivament en mans de la iniciativa privada o de l'ús desregulat dels alumnes. La Generalitat haurà de crear aquest entorn tancat per garantir el control pedagògic i l'equitat entre tots els alumnes de Catalunya. |
| :---- |

6. # **Conclusions finals**

# 

El llibre divideix el desenvolupament cognitiu en **quatre grans etapes o "estadis"**. Per a la teva investigació, els dos últims són els protagonistes absoluts:

> ### **1\. Estadi sensoriomotor (0 a 2 anys)** {#1.-estadi-sensoriomotor-(0-a-2-anys)}

L'infant aprèn a través dels sentits i el moviment. La fita principal és assolir la "permanència de l'objecte": saber que les coses continuen existint encara que no les vegi.

> ### **2\. Estadi preoperacional (2 a 7 anys)** {#2.-estadi-preoperacional-(2-a-7-anys)}

Apareix el llenguatge i el joc simbòlic (per exemple, utilitzar un pal com si fos una espasa). Tanmateix, l'infant té un pensament molt "egocèntric" a nivell cognitiu: li costa molt entendre el punt de vista dels altres i encara no domina la lògica deductiva.

> ### **3\. Estadi de les operacions concretes (7 a 11-12 anys)** {#3.-estadi-de-les-operacions-concretes-(7-a-11-12-anys)}

*(Aquí és on es troba el teu alumne de 1r d'ESO).* El cervell ja és capaç d'utilitzar la lògica i arribar a conclusions vàlides, però **només si s'apliquen a objectes concrets i reals** que pot veure, tocar o imaginar físicament. Comença a entendre conceptes de classificació i seriació. Tot i això, si se li planteja un problema purament abstracte o filosòfic sense exemples del món real, es bloqueja.

> ### **4\. Estadi de les operacions formals (a partir dels 12 anys)** {#4.-estadi-de-les-operacions-formals-(a-partir-dels-12-anys)}

*(Aquí se situa el teu alumne de 2n de Batxillerat).* És el nivell més alt de desenvolupament cognitiu. L'adolescent s'allibera per fi de la necessitat de recolzar-se en objectes físics o exemples visuals. Ara és capaç de:

* **Pensament abstracte:** Entendre conceptes intangibles o variables matemàtiques pures (treballar amb la "x" i la "y" en una equació sense necessitat que representin "pomes" o "peres").

* **Raonament hipoteticodeductiu:** Pot plantejar-se escenaris abstractes ("què passaria si...") i formular hipòtesis estructurades abans d'actuar.

* **Metacognició:** És capaç de pensar sobre el seu propi pensament i avaluar com aprèn.

> **Com lligar aquest resum amb el teu TR:** Aquesta teoria demostra científicament que ensenyar un concepte complex a un alumne de 12 anys exactament igual que a un de 18 és un error pedagògic. L'alumne de 1r d'ESO necessita que la IA actuï de pont i li posi exemples tangibles. L'alumne de Batxillerat, en ple domini de les operacions formals, requereix que la IA utilitzi un vocabulari tècnic i plantegi el temari des de l'abstracció i la deducció.

> 

[^1]:  Platafora Esfer@ és un sistema oficial per a la gestió i administració acadèmica (permet gestionar expedients, matricules…) utilitzat pels centres educatius depenents del Departament d’Educació de la Generalitat de Catalunya. 

[^2]:  Com per exemple la tecnologia que hi ha darrere de ChatGPT o Gemini

[^3]:  Tecnologia que permet a la màquina "aprendre" per si mateixa processant milions d'exemples previs, imitant la manera com les connexions del nostre propi cervell aprenen a base de l'experiència.

[^4]:  API ( Application Programing Interface): permet que dues aplicacions informàtiques puguin compartir dades sense com estan programades. 

[^5]:  Piaget, J., i Inhelder, B. (1993). *La psicologia de l'infant*. Barcelona: Edicions 62\.

[^6]:  Es va desplegar de manera massiva a partir del 2020 conseqüència de la pandèmia per garantir que cap alumne no pogués estudiar per manca de recursos tecnològics.

[^7]:  Les dades es poden classificar en ordinàries (lliure accés) i especials (nivell màxim protecció i està prohibit usar-les a no ser que es compleixin excepcions molt estrictes). Dades especiales son dades de salut mental i física, dades biomètriques i genètiques, orientació sexual, origen ètnic o racial i opinions polítiques o conviccions religioses. 