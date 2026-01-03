import { PAScript } from './types';

export const PA_SCRIPTS: PAScript[] = [
    // --- PRE-FLIGHT ---
    {
        id: 'welcome-aboard',
        title: 'Welcome Announcement',
        category: 'Pre-Flight',
        contentEn: "Ladies and Gentlemen, welcome on board Wings Air Flight 2026 with service to London. We are currently third in line for take-off and are expected to be in the air in approximately five minutes. We ask that you please fasten your seat belts at this time and secure all baggage underneath your seat or in the overhead compartments. Thank you for choosing Wings Air. Enjoy your flight.",
        contentHi: "देवियों और सज्जनों, विंग्स एयर की उड़ान 2026 में आपका स्वागत है। हम अभी उड़ान भरने के लिए कतार में तीसरे स्थान पर हैं और लगभग पांच मिनट में हवा में होने की उम्मीद है। हम आपसे अनुरोध करते हैं कि कृपया इस समय अपनी सीट बेल्ट बांध लें और सभी सामान अपनी सीट के नीचे या ओवरहेड डिब्बों में सुरक्षित रखें। विंग्स एयर चुनने के लिए धन्यवाद। अपनी यात्रा का आनंद लें।",
        targetWPM: 140,
        difficulty: 'Basic',
        demoAudioEn: '/PA-audiofiles/Welcome-Announcement-English.mp3',
        demoAudioHi: '/PA-audiofiles/Welcome-Announcement-Hindi.mp3'
    },
    {
        id: 'boarding-complete',
        title: 'Boarding Complete',
        category: 'Pre-Flight',
        contentEn: "Ladies and Gentlemen, boarding is now complete. Please ensure that your mobile phones and all other electronic devices are switched to airplane mode. If you are seated at an emergency exit, please read the safety instruction card carefully. If you feel you are unable to perform the required actions, please inform a crew member immediately.",
        contentHi: "देवियों और सज्जनों, बोर्डिंग अब पूरी हो चुकी है। कृपया सुनिश्चित करें कि आपके मोबाइल फोन और अन्य सभी इलेक्ट्रॉनिक उपकरण एयरप्लेन मोड पर स्विच कर दिए गए हैं। यदि आप आपातकालीन निकास के पास बैठे हैं, तो कृपया सुरक्षा निर्देश कार्ड को ध्यान से पढ़ें। यदि आपको लगता है कि आप आवश्यक कार्य करने में असमर्थ हैं, तो कृपया तुरंत चालक दल के सदस्य को सूचित करें।",
        targetWPM: 145,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Boarding-Complete-English.mp3', 
        demoAudioHi: '/PA-audiofiles/Boarding-Complete-Hindi.mp3'
    },
    {
        id: 'safety-demo',
        title: 'Safety Demonstration',
        category: 'Pre-Flight',
        contentEn: "Ladies and Gentlemen, please direct your attention to the cabin crew. There are eight emergency exits on this aircraft. Take a moment to locate your nearest exit. If the cabin pressure changes, an oxygen mask will drop from the panel above you. Pull the mask towards you to start the flow of oxygen. Place the mask over your nose and mouth and breathe normally.",
        contentHi: "देवियों और सज्जनों, कृपया केबिन क्रू पर ध्यान दें। इस विमान में आठ आपातकालीन निकास हैं। अपने निकटतम निकास का पता लगाने के लिए एक क्षण निकालें। यदि केबिन का दबाव बदलता है, तो आपके ऊपर के पैनल से एक ऑक्सीजन मास्क गिरेगा। ऑक्सीजन का प्रवाह शुरू करने के लिए मास्क को अपनी ओर खींचें। मास्क को अपनी नाक और मुंह पर रखें और सामान्य रूप से सांस लें।",
        targetWPM: 130,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Safety-Demonstration-English.mp3',
        demoAudioHi: '/PA-audiofiles/Safety-Demonstration-Hindi.mp3'
    },

    // --- DEPARTURE ---
    {
        id: 'cabin-secure',
        title: 'Cabin Secure (Take-off)',
        category: 'Departure',
        contentEn: "Cabin Crew, please secure the cabin for take-off. Ladies and Gentlemen, we are now ready for departure. Please ensure your seatbelt is tightly fastened, your tray table is stowed, and your window blind is open. Thank you.",
        contentHi: "केबिन क्रू, कृपया टेक-ऑफ के लिए केबिन को सुरक्षित करें। देवियों और सज्जनों, अब हम प्रस्थान के लिए तैयार हैं। कृपया सुनिश्चित करें कि आपकी सीट बेल्ट कसकर बंधी है, आपकी ट्रे टेबल बंद है, और आपकी खिड़की का पर्दा खुला है। धन्यवाद।",
        targetWPM: 145,
        difficulty: 'Basic',
        demoAudioEn: '/PA-audiofiles/Cabin-Secure-English.mp3',
        demoAudioHi: '/PA-audiofiles/Cabin-Secure-Hindi.mp3'
    },
    {
        id: 'after-takeoff',
        title: 'After Take-off (Climb)',
        category: 'Departure',
        contentEn: "Ladies and Gentlemen, we have now reached our initial cruising altitude. The Captain has turned off the 'Fasten Seat Belt' sign, and you may now move about the cabin. However, we recommend that you keep your seatbelt fastened whenever you are seated. Thank you.",
        contentHi: "देवियों और सज्जनों, अब हम अपनी प्रारंभिक उड़ान ऊंचाई पर पहुंच गए हैं। कप्तान ने 'सीट बेल्ट बांधें' का संकेत बंद कर दिया है, और अब आप केबिन में घूम सकते हैं। हालाँकि, हम अनुशंसा करते हैं कि जब भी आप बैठे हों तो अपनी सीट बेल्ट बांधे रखें। धन्यवाद।",
        targetWPM: 140,
        difficulty: 'Basic',
        demoAudioEn: '/PA-audiofiles/After-Take-off-English.mp3',
        demoAudioHi: '/PA-audiofiles/After-Take-off-Hindi.mp3'
    },

    // --- IN-FLIGHT ---
    {
        id: 'meal-service',
        title: 'Meal Service',
        category: 'In-Flight',
        contentEn: "Ladies and Gentlemen, we will shortly begin our meal service. Today we have a selection of Indian and Continental dishes. We also offer a variety of hot and cold beverages. Please refer to the menu card in your seat pocket for details. Our crew will be moving through the cabin shortly to serve you.",
        contentHi: "देवियों और सज्जनों, हम जल्द ही भोजन सेवा शुरू करेंगे। आज हमारे पास भारतीय और कॉन्टिनेंटल व्यंजनों का चयन है। हम विभिन्न प्रकार के गर्म और ठंडे पेय भी प्रदान करते हैं। विवरण के लिए कृपया अपनी सीट की जेब में रखे मेनू कार्ड को देखें। हमारा क्रू आपकी सेवा के लिए जल्द ही केबिन में आएगा।",
        targetWPM: 135,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Meal-Service-English.mp3',
        demoAudioHi: '/PA-audiofiles/Meal-Service-Hindi.mp3'
    },
    {
        id: 'turbulence',
        title: 'Turbulence Reassurance',
        category: 'In-Flight',
        contentEn: "Ladies and Gentlemen, the Captain has turned on the 'Fasten Seat Belt' sign. We are currently experiencing some turbulence. We ask that you please return to your seats and remain seated with your seat belt securely fastened. Thank you for your cooperation.",
        contentHi: "देवियों और सज्जनों, कप्तान ने 'सीट बेल्ट बांधें' का संकेत चालू कर दिया है। हम वर्तमान में कुछ अशांति (टर्बुलेंस) का अनुभव कर रहे हैं। हम आपसे अनुरोध करते हैं कि कृपया अपनी सीटों पर लौट आएं और अपनी सीट बेल्ट बांधकर बैठे रहें। आपके सहयोग के लिए धन्यवाद।",
        targetWPM: 125,
        difficulty: 'Basic',
        demoAudioEn: '/PA-audiofiles/Turbulence-Reassurance-English.mp3',
        demoAudioHi: '/PA-audiofiles/Turbulence-Reassurance-Hindi.mp3'
    },
    {
        id: 'duty-free',
        title: 'Duty-Free Service',
        category: 'In-Flight',
        contentEn: "Ladies and Gentlemen, we are pleased to inform you that our Sky-Shop boutique is now open. We offer a wide range of luxury perfumes, watches, and exclusive Wings Air merchandise at tax-free prices. We accept all major credit cards. Happy shopping!",
        contentHi: "देवियों और सज्जनों, हमें आपको सूचित करते हुए खुशी हो रही है कि हमारा स्काई-શૉપ બુટીક હવે ખુલ્લું છે. અમે ટેક્સ-ફ્રી કિંમતો પર લક્ઝરી ઇત્ર, ઘડિયાળો અને વિશેષ વિંગ્સ એર મર્ચન્ડાઇઝની એક વિસ્તૃત શ્રેણી રજૂ કરીએ છીએ. અમે તમામ મુખ્ય ક્રેડિટ કાર્ડ સ્વીકારીએ છીએ. ખરીદીનો આનંદ માણો!",
        targetWPM: 150,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Duty-Free-Service-English.mp3',
        demoAudioHi: '/PA-audiofiles/Duty-Free-Service-Hindi.mp3'
    },

    // --- ARRIVAL ---
    {
        id: 'initial-descent',
        title: 'Initial Descent',
        category: 'Arrival',
        contentEn: "Ladies and Gentlemen, we have begun our descent into London. We expect to land in approximately 30 minutes. At this time, we ask that you return to your seats and ensure all cabin baggage is securely stowed. Thank you.",
        contentHi: "देवियों और सज्जनों, हमने लंदन के लिए अपनी उतरने की प्रक्रिया शुरू कर दी है। हम लगभग 30 मिनट में लैंड करने की उम्मीद करते हैं। इस समय, हम आपसे अपनी सीटों पर लौटने और यह सुनिश्चित करने का अनुरोध करते हैं कि सभी केबिन सामान सुरक्षित रूप से रखा गया है। धन्यवाद।",
        targetWPM: 135,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Initial-Descent-English.mp3',
        demoAudioHi: '/PA-audiofiles/Initial-Descent-Hindi.mp3'
    },
    {
        id: 'final-approach',
        title: 'Final Approach',
        category: 'Arrival',
        contentEn: "Ladies and Gentlemen, we are on our final approach. Please ensure that your seatback is in its full upright position, your tray table is stowed, and your window blind is open. Please ensure all electronic devices are switched off. Cabin Crew, please take your seats for landing.",
        contentHi: "देवियों और सज्जनों, हम अपनी अंतिम एप्रोच पर हैं। कृपया सुनिश्चित करें कि आपकी सीट सीधी स्थिति में है, आपकी ट्रे टेबल बंद है, और आपकी खिड़की का पर्दा खुला है। कृपया सुनिश्चित करें कि सभी इलेक्ट्रॉनिक उपकरण बंद हैं। केबिन क्रू, कृपया लैंडિંગ के लिए अपनी सीटें ग्रहण करें।",
        targetWPM: 140,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Final-Approach-English.mp3',
        demoAudioHi: '/PA-audiofiles/Final-Approach-Hindi.mp3'
    },
    {
        id: 'landing',
        title: 'Landing Announcement',
        category: 'Arrival',
        contentEn: "Ladies and Gentlemen, welcome to London Heathrow International Airport. For your safety, please remain seated with your seat belt fastened until the Captain has turned off the Fasten Seat Belt sign. Please check around your seat for any personal belongings. It has been a pleasure serving you.",
        contentHi: "देवियों और सज्जनों, लंदन हीथ્રો अंतर्राष्ट्रीय हवाई अड्डे पर आपका स्वागत है। आपकी सुरक्षा के लिए, कृपया तब तक अपनी सीट बेल्ट बांधकर बैठे रहें तक कप्तान सीट बेल्ट का संकेत बंद न कर दे। कृपया अपने सामान के लिए अपनी सीट के आसपास जांच करें। आपकी सेवा करना हमारे लिए खुशी की बात रही।",
        targetWPM: 145,
        difficulty: 'Standard',
        demoAudioEn: '/PA-audiofiles/Landing-Announcement-English.mp3',
        demoAudioHi: '/PA-audiofiles/Landing-Announcement-Hindi.mp3'
    },

    // --- EMERGENCY ---
    {
        id: 'emergency-prep',
        title: 'Emergency Landing Prep',
        category: 'Emergency',
        contentEn: "Ladies and Gentlemen, this is an emergency announcement. Please remain calm and follow the instructions of your cabin crew. remove all sharp objects from your person. When the command 'Brace, Brace' is given, lean forward with your hands over your head. Your safety is our absolute priority.",
        contentHi: "देवियों और सज्जनों, यह एक आपातकालीन घोषणा है। कृपया शांत रहें और अपने केबिन क्रू के निर्देशों का पालन करें। अपने पास से सभी नुकीली चीजें हटा दें। जब 'ब्रेस, ब्रेस' का आदेश दिया जाए, तो अपने हाथों को अपने सिर पर रखकर आगे की ओर झुकें। आपकी सुरक्षा हमारी सर्वोच्च प्राथमिकता है।",
        targetWPM: 150,
        difficulty: 'Elite',
        demoAudioEn: '/PA-audiofiles/Emergency-Landing-Prep-English.mp3',
        demoAudioHi: '/PA-audiofiles/Emergency-Landing-Prep-Hindi.mp3'
    },
    {
        id: 'rapid-evac',
        title: 'Rapid Evacuation',
        category: 'Emergency',
        contentEn: "Evacuate! Evacuate! Open Seatbelts! Come this way! Leave everything behind! Jump and slide! Move away from the aircraft! Stay together! Keep moving!",
        contentHi: "विमान खाली करो! विमान खाली करो! अपनी सीट बेल्ट खोलो! इधर आओ! सब कुछ पीछे छोड़ दो! कूदो और फिसलो! विमान से दूर भागो! साथ रहो! चलते रहो!",
        targetWPM: 160,
        difficulty: 'Elite',
        demoAudioEn: '/PA-audiofiles/Rapid-Evacuation-English.mp3',
        demoAudioHi: '/PA-audiofiles/Rapid-Evacuation-Hindi.mp3'
    },
    {
        id: 'medical-emergency',
        title: 'Medical Assistance Call',
        category: 'Emergency',
        contentEn: "Ladies and Gentlemen, we have a passenger who requires immediate medical attention. If there is a doctor, nurse, or qualified medical professional on board, please identify yourself to a member of the crew immediately. Thank you for your assistance.",
        contentHi: "देवियों और सज्जनों, हमारे पास एक यात्री हैं जिन्हें तत्काल चिकित्सा सहायता की आवश्यकता है। यदि विमान में कोई डॉक्टर, नर्स या योग्य चिकित्सा पेशेवर मौजूद हैं, तो कृपया तुरंत चालक दल के सदस्य को अपना परिचय दें। आपकी सहायता के लिए धन्यवाद।",
        targetWPM: 130,
        difficulty: 'Elite',
        demoAudioEn: '/PA-audiofiles/Medical-Assistance-Call-English.mp3',
        demoAudioHi: '/PA-audiofiles/Medical-Assistance-Call-Hindi.mp3'
    }
];