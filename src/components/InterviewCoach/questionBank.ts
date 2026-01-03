
import { Question } from './types';

// Helper to create Question objects with translations
const q = (en: string, hi?: string, gu?: string): Question => ({
  en,
  hi: hi || en, // Fallback to English if translation missing
  gu: gu || en
});

// --- CABIN CREW ROUNDS ---

const CABIN_CREW_INTRO = [
  q(
    "Tell us about yourself and why you specifically want to join the aviation industry?",
    "अपने बारे में बताएं और यह भी कि आप विशेष रूप से एविएशन उद्योग में क्यों शामिल होना चाहते हैं?",
    "તમારા વિશે જણાવો અને તમે ખાસ કરીને ઉડ્ડયન ઉદ્યોગમાં કેમ જોડાવા માંગો છો?"
  ),
  q(
    "Why do you think you are a good fit for our airline's cabin crew team?",
    "आपको क्यों लगता है कि आप हमारी एयरलाइन की केबिन क्रू टीम के लिए उपयुक्त हैं?",
    "તમને કેમ લાગે છે કે તમે અમારી એરલાઇનની કેબિન ક્રૂ ટીમ માટે યોગ્ય છો?"
  ),
  q(
    "What are your greatest strengths that will help you at 35,000 feet?",
    "आपकी सबसे बड़ी ताकत क्या है जो आपको 35,000 फीट की ऊंचाई पर मदद करेगी?",
    "તમારી સૌથી મોટી શક્તિઓ કઈ છે જે તમને 35,000 ફૂટ પર મદદ કરશે?"
  ),
  q(
    "Describe a time you went above and beyond for a customer in your previous role.",
    "उस समय का वर्णन करें जब आपने अपनी पिछली भूमिका में ग्राहक के लिए उम्मीद से बढ़कर काम किया हो।",
    "તમે તમારી અગાઉની ભૂમિકામાં ગ્રાહક માટે અપેક્ષા કરતાં વધુ સારું કામ કર્યું હોય તેવા સમયનું વર્ણન કરો."
  ),
  q(
    "How would your friends and family describe your personality?",
    "आपके दोस्त और परिवार आपके व्यक्तित्व का वर्णन कैसे करेंगे?",
    "તમારા મિત્રો અને પરિવાર તમારા વ્યક્તિત્વનું વર્ણન કેવી રીતે કરશે?"
  ),
  q("Why do you want to leave your current path to join aviation?", "आप एविएशन में शामिल होने के लिए अपना वर्तमान करियर क्यों छोड़ना चाहते हैं?", "તમે ઉડ્ડયનમાં જોડાવા માટે તમારો વર્તમાન માર્ગ કેમ છોડવા માંગો છો?"),
  q("What do you know about our airline's history and values?", "आप हमारी एयरलाइन के इतिहास और मूल्यों के बारे में क्या जानते हैं?", "તમે અમારી એરલાઇનના ઇતિહાસ અને મૂલ્યો વિશે શું જાણો છો?"),
  q("Where do you see yourself in the aviation industry in 5 years?", "आप 5 साल में खुद को एविएशन इंडस्ट्री में कहां देखते हैं?", "તમે 5 વર્ષમાં તમારી જાતને ઉડ્ડયન ઉદ્યોગમાં ક્યાં જુઓ છો?"),
  q("How do you handle being away from family for long periods?", "आप लंबे समय तक परिवार से दूर रहने को कैसे संभालते हैं?", "તમે લાંબા સમય સુધી પરિવારથી દૂર રહેવાનું કેવી રીતે સંભાળો છો?"),
  q("What excites you most about the lifestyle of a flight attendant?", "फ्लाइट अटेंडेंट की जीवनशैली के बारे में आपको सबसे ज्यादा क्या उत्साहित करता है?", "ફ્લાઇટ એટેન્ડન્ટની જીવનશૈલી વિશે તમને સૌથી વધુ શું ઉત્સાહિત કરે છે?")
];

const CABIN_CREW_GROOMING = [
  q(
    "Why is grooming so critical for a cabin crew member?",
    "केबिन क्रू सदस्य के लिए ग्रूमिंग (साज-सज्जा) इतनी महत्वपूर्ण क्यों है?",
    "કેબિન ક્રૂ મેમ્બર માટે ગ્રૂમિંગ (સાજ-સજ્જા) શા માટે મહત્વપૂર્ણ છે?"
  ),
  q(
    "How do you take care of your skin during long flights?",
    "लंबी उड़ानों के दौरान आप अपनी त्वचा की देखभाल कैसे करते हैं?",
    "લાંબી ફ્લાઇટ્સ દરમિયાન તમે તમારી ત્વચાની સંભાળ કેવી રીતે રાખો છો?"
  ),
  q(
    "What is your daily grooming routine?",
    "आपकी दैनिक ग्रूमिंग दिनचर्या क्या है?",
    "તમારી દૈનિક ગ્રૂમિંગ દિનચર્યા શું છે?"
  ),
  q(
    "Are you comfortable with our uniform guidelines regarding tattoos?",
    "क्या आप टैटू के संबंध में हमारे वर्दी दिशानिर्देशों के साथ सहज हैं?",
    "શું તમે ટેટૂઝ અંગેની અમારી યુનિફોર્મ માર્ગદર્શિકા સાથે આરામદાયક છો?"
  ),
  q(
    "How would you handle a colleague who has poor hygiene?",
    "आप उस सहकर्मी को कैसे संभालेंगे जिसकी स्वच्छता (hygiene) खराब है?",
    "તમે નબળી સ્વચ્છતા ધરાવતા સહકાર્યકરને કેવી રીતે હેન્ડલ કરશો?"
  ),
  q("What does 'professional appearance' mean to you?", "'पेशेवर उपस्थिति' आपके लिए क्या मायने रखती है?", "તમારા માટે 'વ્યાવસાયિક દેખાવ' નો અર્થ શું છે?"),
  q("How do you maintain your fitness and BMI?", "आप अपनी फिटनेस और बीएमआई (BMI) को कैसे बनाए रखते हैं?", "તમે તમારી ફિટનેસ અને BMI કેવી રીતે જાળવી રાખો છો?"),
  q("Why do airlines have strict height and weight requirements?", "एयरलाइनों में ऊंचाई और वजन की सख्त आवश्यकताएं क्यों होती हैं?", "એરલાઇન્સમાં ઊંચાઈ અને વજનની કડક આવશ્યકતાઓ શા માટે હોય છે?"),
  q("How would you react if a passenger criticized your appearance?", "यदि कोई यात्री आपकी उपस्थिति की आलोचना करता है तो आप कैसे प्रतिक्रिया देंगे?", "જો કોઈ મુસાફર તમારા દેખાવની ટીકા કરે તો તમે કેવી પ્રતિક્રિયા આપશો?"),
  q("What makeup essentials would you carry in your flight bag?", "आप अपने फ्लाइट बैग में कौन सा मेकअप सामान रखेंगे?", "તમે તમારી ફ્લાઇટ બેગમાં કઈ મેકઅપ આવશ્યકતાઓ રાખશો?")
];

// For other rounds, we use the helper to maintain the structure. 
// Translations can be added progressively. Currently providing English fallbacks via the `q` helper logic.

const CABIN_CREW_SERVICE = [
  q("A passenger complains their meal is cold. What do you do?", "एक यात्री शिकायत करता है कि उनका भोजन ठंडा है। आप क्या करेंगे?", "એક મુસાફર ફરિયાદ કરે છે કે તેમનું ભોજન ઠંડુ છે. તમે શું કરશો?"),
  q("How would you handle a passenger asking for a free upgrade?", "आप मुफ्त अपग्रेड मांगने वाले यात्री को कैसे संभालेंगे?", "તમે મફત અપગ્રેડ માટે પૂછતા મુસાફરને કેવી રીતે હેન્ડલ કરશો?"),
  q("A child is crying uncontrollably. How do you help the parents?", "एक बच्चा बेकाबू होकर रो रहा है। आप माता-पिता की मदद कैसे करेंगे?", "એક બાળક રડી રહ્યું છે. તમે માતાપિતાને કેવી રીતે મદદ કરશો?"),
  q("A VIP passenger is unhappy with the wine selection. Handle it.", "एक वीआईपी यात्री वाइन चयन से नाखुश है। इसे संभालें।", "એક VIP મુસાફર વાઇન પસંદગીથી નાખુશ છે. આને હેન્ડલ કરો."),
  q("You spill coffee on a passenger. What is your immediate reaction?", "आप गलती से यात्री पर कॉफी गिरा देते हैं। आपकी तत्काल प्रतिक्रिया क्या होगी?", "તમે ભૂલથી મુસાફર પર કોફી ઢોળી દો છો. તમારી તાત્કાલિક પ્રતિક્રિયા શું હશે?"),
  q("Two passengers are arguing over a reclined seat. Intervene."),
  q("A passenger is rude to your colleague. How do you support them?"),
  q("How do you refuse alcohol to an intoxicated passenger politely?"),
  q("A passenger wants a meal choice that has run out. What do you say?"),
  q("How do you handle a passenger who is smoking in the lavatory?")
];

const CABIN_CREW_EMERGENCY = [
  q("What are your first actions during a sudden decompression?", "अचानक डिकंप्रेशन के दौरान आपके पहले कार्य क्या होंगे?", "અચાનક ડિકમ્પ્રેશન દરમિયાન તમારી પ્રથમ ક્રિયાઓ શું હશે?"),
  q("How would you handle a fire in the oven?", "ओवन में आग लगने पर आप क्या करेंगे?", "ઓવનમાં આગ લાગે તો તમે શું કરશો?"),
  q("A passenger is having a heart attack. What do you do?", "एक यात्री को दिल का दौरा पड़ रहा है। आप क्या करेंगे?", "એક મુસાફરને હાર્ટ એટેક આવી રહ્યો છે. તમે શું કરશો?"),
  q("Explain the evacuation commands you would shout on land.", "भूमि पर निकासी (evacuation) के दौरान आप जो आदेश चिल्लाएंगे, उन्हें समझाएं।", "જમીન પર ઇવેક્યુએશન દરમિયાન તમે જે આદેશો બૂમો પાડશો તે સમજાવો."),
  q("How do you handle a disruptive passenger who is threatening safety?", "आप सुरक्षा को खतरा पैदा करने वाले यात्री को कैसे संभालेंगे?", "તમે સુરક્ષા માટે ખતરો ઉભો કરનાર મુસાફરને કેવી રીતે હેન્ડલ કરશો?")
];

// --- AIRPORT STAFF ROUNDS ---

const AIRPORT_CSA = [
  q("A passenger arrives 5 minutes after the counter closes. Handle it.", "काउंटर बंद होने के 5 मिनट बाद एक यात्री आता है। इसे संभालें।", "કાઉન્ટર બંધ થયાના 5 મિનિટ પછી એક મુસાફર આવે છે. તેને હેન્ડલ કરો."),
  q("How do you explain an excess baggage fee to an angry passenger?", "आप एक क्रोधित यात्री को अतिरिक्त सामान शुल्क कैसे समझाएंगे?", "તમે ગુસ્સે થયેલા મુસાફરને વધારાના સામાનની ફી કેવી રીતે સમજાવશો?"),
  q("A flight is cancelled due to weather. Make an announcement.", "मौसम के कारण उड़ान रद्द कर दी गई है। एक घोषणा करें।", "હવામાનને કારણે ફ્લાઇટ રદ કરવામાં આવી છે. જાહેરાત કરો."),
  q("A passenger has lost their passport at the gate. Assist them.", "एक यात्री ने गेट पर अपना पासपोर्ट खो दिया है। उनकी सहायता करें।", "એક મુસાફરે ગેટ પર તેમનો પાસપોર્ટ ગુમાવ્યો છે. તેમને મદદ કરો."),
  q("How do you handle a long queue at the check-in counter?", "चेक-इन काउंटर पर लंबी कतार को आप कैसे संभालेंगे?", "ચેક-ઇન કાઉન્ટર પર લાંબી કતારને તમે કેવી રીતે હેન્ડલ કરશો?")
];

const AIRPORT_SECURITY = [
  q("You find a knife in a passenger's hand baggage. What do you do?", "आपको यात्री के हैंड बैगेज में चाकू मिलता है। आप क्या करेंगे?", "તમને મુસાફરના હેન્ડ બેગેજમાં છરી મળે છે. તમે શું કરશો?"),
  q("A passenger refuses to remove their belt for screening.", "एक यात्री स्क्रीनिंग के लिए अपनी बेल्ट हटाने से मना कर देता है।", "એક મુસાફર સ્ક્રીનિંગ માટે તેમનો બેલ્ટ કાઢવાની ના પાડે છે."),
  q("How do you handle a bomb threat call received at the desk?", "डेस्क पर प्राप्त बम की धमकी वाली कॉल को आप कैसे संभालेंगे?", "ડેસ્ક પર મળેલા બોમ્બની ધમકીના કોલને તમે કેવી રીતે હેન્ડલ કરશો?"),
  q("A passenger makes a joke about having a bomb. React.", "एक यात्री बम होने का मजाक बनाता है। प्रतिक्रिया दें।", "એક મુસાફર બોમ્બ હોવાની મજાક કરે છે. પ્રતિક્રિયા આપો."),
  q("What are the prohibited items in cabin baggage?", "केबिन बैगेज में कौन सी वस्तुएं प्रतिबंधित हैं?", "કેબિન બેગેજમાં કઈ વસ્તુઓ પ્રતિબંધિત છે?")
];

const AIRPORT_RAMP = [
  q("You see fuel leaking near the aircraft. What is your first step?"),
  q("A bag falls off the cart on the tarmac. What do you do?"),
  q("How do you communicate with the cockpit from the ground?"),
  q("A vehicle is speeding near the aircraft. React."),
  q("What are the safety zones around a jet engine?")
];

const AIRPORT_CARGO = [
  q("What is an Airway Bill (AWB) and why is it important?"),
  q("How do you handle Dangerous Goods (DGR) paperwork?"),
  q("A shipment arrives with damaged packaging. Procedure?"),
  q("What is the difference between General Cargo and Special Cargo?"),
  q("How do you calculate volumetric weight?")
];

// --- HOTEL MANAGEMENT ROUNDS ---

const HOTEL_FRONT_OFFICE = [
  q("A guest cannot find their reservation in the system. Handle it.", "एक अतिथि सिस्टम में अपना आरक्षण नहीं ढूंढ पा रहा है। इसे संभालें।", "એક મહેમાન સિસ્ટમમાં તેમનું રિઝર્વેશન શોધી શકતા નથી. આને હેન્ડલ કરો."),
  q("A guest wants a room with a sea view, but hotel is full.", "एक अतिथि समुद्र के दृश्य वाला कमरा चाहता है, लेकिन होटल भरा हुआ है।", "એક મહેમાન સી-વ્યુ રૂમ ઈચ્છે છે, પરંતુ હોટેલ ફૂલ છે."),
  q("How do you handle a check-in for a VIP celebrity guest?", "आप वीआईपी सेलिब्रिटी अतिथि के लिए चेक-इन कैसे संभालेंगे?", "તમે VIP સેલિબ્રિટી મહેમાન માટે ચેક-ઇન કેવી રીતે હેન્ડલ કરશો?"),
  q("A guest complains about noise from the next room at 2 AM.", "एक अतिथि सुबह 2 बजे बगल के कमरे से शोर की शिकायत करता है।", "એક મહેમાન રાત્રે 2 વાગ્યે બાજુના રૂમમાંથી અવાજની ફરિયાદ કરે છે."),
  q("How do you upsell a suite to a standard booking guest?", "आप एक मानक बुकिंग अतिथि को सुइट कैसे अपसेल (upsell) करेंगे?", "તમે સ્ટાન્ડર્ડ બુકિંગ મહેમાનને સ્યુટ કેવી રીતે અપસેલ કરશો?")
];

const HOTEL_HOUSEKEEPING = [
  q("You find a guest's wallet in the room after checkout.", "चेकआउट के बाद आपको कमरे में अतिथि का बटुआ मिलता है।", "ચેકઆઉટ પછી તમને રૂમમાં મહેમાનનું પાકીટ મળે છે."),
  q("A guest accuses you of stealing their watch. React.", "एक अतिथि आप पर उनकी घड़ी चोरी करने का आरोप लगाता है। प्रतिक्रिया दें।", "એક મહેમાન તમારા પર તેમની ઘડિયાળ ચોરી કરવાનો આરોપ મૂકે છે. પ્રતિક્રિયા આપો."),
  q("How do you clean a room with a 'Bio-hazard' situation?", "आप 'बायो-हज़ार्ड' स्थिति वाले कमरे को कैसे साफ करेंगे?", "તમે 'બાયો-હેઝાર્ડ' સ્થિતિવાળા રૂમને કેવી રીતે સાફ કરશો?"),
  q("A guest wants their room cleaned while they are inside.", "एक अतिथि चाहता है कि जब वे अंदर हों तो उनका कमरा साफ किया जाए।", "એક મહેમાન ઈચ્છે છે કે તેઓ અંદર હોય ત્યારે તેમનો રૂમ સાફ કરવામાં આવે."),
  q("How do you prioritize which rooms to clean first?", "आप प्राथमिकता कैसे तय करेंगे कि कौन से कमरे पहले साफ करने हैं?", "કયા રૂમ પહેલા સાફ કરવા તે તમે કેવી રીતે નક્કી કરશો?")
];

const HOTEL_FNB = [
  q("A guest says they are allergic to gluten. What do you suggest?"),
  q("You spill wine on a guest's dress. What do you do?"),
  q("A guest complains the steak is undercooked."),
  q("How do you handle a table of 10 with only one waiter?"),
  q("A guest wants to order off the menu. Can you do it?")
];

const HOTEL_KITCHEN = [
  q("What are the 5 Mother Sauces?"),
  q("Explain the difference between chopping and dicing."),
  q("How do you handle a busy dinner service?"),
  q("What is FIFO and why is it important?"),
  q("How do you fix a sauce that is too salty?")
];

export const getStaticQuestions = (industryId: string, roundId: string): Question[] => {
  let questionsList: Question[] = [];

  // CABIN CREW
  if (industryId === 'cabinCrew') {
    if (roundId === 'intro') questionsList = CABIN_CREW_INTRO;
    else if (roundId === 'grooming') questionsList = CABIN_CREW_GROOMING;
    else if (roundId === 'service') questionsList = CABIN_CREW_SERVICE;
    else if (roundId === 'emergency') questionsList = CABIN_CREW_EMERGENCY;
  } 
  // AIRPORT STAFF
  else if (industryId === 'airportStaff') {
    if (roundId === 'csa') questionsList = AIRPORT_CSA;
    else if (roundId === 'security') questionsList = AIRPORT_SECURITY;
    else if (roundId === 'ramp') questionsList = AIRPORT_RAMP;
    else if (roundId === 'cargo') questionsList = AIRPORT_CARGO;
  }
  // HOTEL MANAGEMENT
  else if (industryId === 'hotelJob') {
    if (roundId === 'frontOffice') questionsList = HOTEL_FRONT_OFFICE;
    else if (roundId === 'housekeeping') questionsList = HOTEL_HOUSEKEEPING;
    else if (roundId === 'fnb') questionsList = HOTEL_FNB;
    else if (roundId === 'kitchen') questionsList = HOTEL_KITCHEN;
  }

  // Fallback to avoid empty state
  if (questionsList.length === 0) {
    questionsList = [q("Tell me about yourself.", "अपने बारे में बताएं।", "તમારા વિશે જણાવો.")];
  }

  return questionsList;
};
