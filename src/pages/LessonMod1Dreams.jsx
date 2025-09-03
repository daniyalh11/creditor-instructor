import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const LessonMod1Dreams = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US'); // Local state for audio section only
  const [quizAnswers, setQuizAnswers] = useState({}); // State for quiz answers
  const textRef = useRef(null);

  // Language options - Only languages with commonly available voices
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'en-AU', label: '🇦🇺 English (Australia)' },
    { code: 'en-CA', label: '🇨🇦 English (Canada)' },
    { code: 'hi-IN', label: '🇮🇳 हिन्दी (Hindi)' },
    { code: 'mr-IN', label: '🇮🇳 मराठी (Marathi)' },
    { code: 'ta-IN', label: '🇮🇳 தமிழ் (Tamil)' },
    { code: 'te-IN', label: '🇮🇳 తెలుగు (Telugu)' },
    { code: 'bn-IN', label: '🇮🇳 বাংলা (Bengali)' },
    { code: 'gu-IN', label: '🇮🇳 ગુજરાતી (Gujarati)' },
    { code: 'kn-IN', label: '🇮🇳 ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', label: '🇮🇳 മലയാളം (Malayalam)' },
    { code: 'pa-IN', label: '🇮🇳 ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur-IN', label: '🇮🇳 اردو (Urdu)' },
    { code: 'fr-FR', label: '🇫🇷 Français (French)' },
    { code: 'fr-CA', label: '🇨🇦 Français (Canada)' },
    { code: 'de-DE', label: '🇩🇪 Deutsch (German)' },
    { code: 'es-ES', label: '🇪🇸 Español (Spain)' },
    { code: 'es-MX', label: '🇲🇽 Español (Mexico)' },
    { code: 'it-IT', label: '🇮🇹 Italiano (Italian)' },
    { code: 'pt-PT', label: '🇵🇹 Português (Portugal)' },
    { code: 'pt-BR', label: '🇧🇷 Português (Brazil)' },
    { code: 'nl-NL', label: '🇳🇱 Nederlands (Dutch)' },
    { code: 'sv-SE', label: '🇸🇪 Svenska (Swedish)' },
    { code: 'no-NO', label: '🇳🇴 Norsk (Norwegian)' },
    { code: 'da-DK', label: '🇩🇰 Dansk (Danish)' },
    { code: 'fi-FI', label: '🇫🇮 Suomi (Finnish)' },
    { code: 'pl-PL', label: '🇵🇱 Polski (Polish)' },
    { code: 'ru-RU', label: '🇷🇺 Русский (Russian)' },
    { code: 'uk-UA', label: '🇺🇦 Українська (Ukrainian)' },
    { code: 'cs-CZ', label: '🇨🇿 Čeština (Czech)' },
    { code: 'sk-SK', label: '🇸🇰 Slovenčina (Slovak)' },
    { code: 'hu-HU', label: '🇭🇺 Magyar (Hungarian)' },
    { code: 'ro-RO', label: '🇷🇴 Română (Romanian)' },
    { code: 'bg-BG', label: '🇧🇬 Български (Bulgarian)' },
    { code: 'hr-HR', label: '🇭🇷 Hrvatski (Croatian)' },
    { code: 'sl-SI', label: '🇸🇮 Slovenščina (Slovenian)' },
    { code: 'et-EE', label: '🇪🇪 Eesti (Estonian)' },
    { code: 'lv-LV', label: '🇱🇻 Latviešu (Latvian)' },
    { code: 'lt-LT', label: '🇱🇹 Lietuvių (Lithuanian)' },
    { code: 'el-GR', label: '🇬🇷 Ελληνικά (Greek)' },
    { code: 'tr-TR', label: '🇹🇷 Türkçe (Turkish)' },
    { code: 'is-IS', label: '🇮🇸 Íslenska (Icelandic)' },
    { code: 'mt-MT', label: '🇲🇹 Malti (Maltese)' },
    { code: 'ja-JP', label: '🇯🇵 日本語 (Japanese)' },
    { code: 'ko-KR', label: '🇰🇷 한국어 (Korean)' },
    { code: 'zh-CN', label: '🇨🇳 中文 (Chinese Simplified)' },
    { code: 'zh-TW', label: '🇹🇼 繁體中文 (Chinese Traditional)' },
    { code: 'th-TH', label: '🇹🇭 ไทย (Thai)' },
    { code: 'vi-VN', label: '🇻🇳 Tiếng Việt (Vietnamese)' },
    { code: 'id-ID', label: '🇮🇩 Bahasa Indonesia (Indonesian)' },
    { code: 'ms-MY', label: '🇲🇾 Bahasa Melayu (Malay)' },
    { code: 'fil-PH', label: '🇵🇭 Filipino (Philippines)' },
    { code: 'ar-SA', label: '🇸🇦 العربية (Arabic)' },
    { code: 'he-IL', label: '🇮🇱 עברית (Hebrew)' },
    { code: 'fa-IR', label: '🇮🇷 فارسی (Persian)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module1: 'Module 1: Understanding Your Dreams',
        courseTitle: 'Protecting Dreams',
        description: 'Discover what financial security means for your family\'s future',
        complete: 'Complete Module'
      },
      'hi': { 
        backToModules: 'मॉड्यूल्स पर वापस जाएं',
        module1: 'मॉड्यूल 1: अपने सपनों को समझना',
        courseTitle: 'सपनों की रक्षा',
        description: 'जानें कि आपके परिवार के भविष्य के लिए वित्तीय सुरक्षा का क्या मतलब है',
        complete: 'मॉड्यूल पूरा करें'
      },
      'mr': { 
        backToModules: 'मॉड्यूल्सकडे परत जा',
        module1: 'मॉड्यूल 1: तुमचे स्वप्ने समजून घेणे',
        courseTitle: 'स्वप्नांचे संरक्षण',
        description: 'तुमच्या कुटुंबाच्या भविष्यासाठी आर्थिक सुरक्षा म्हणजे काय हे जाणून घ्याल. आम्ही व्यावहारिक पावले सांगू ज्यामुळे तुम्ही एक मजबूत आर्थिक पाया तयार करू शकता जो अनिश्चिततेतही स्वप्ने मार्गावर ठेवतो.',
        complete: 'मॉड्यूल पूर्ण करा'
      }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1);
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || 
                          v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || 
                          v[0];
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoiceURI]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    const isSpeaking = speakingBlocks[blockKey];
    if (isSpeaking) {
      synth.cancel();
      setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
      return;
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    
    // Enhanced voice selection with fallback strategies
    const findBestVoice = (targetLang) => {
      // Strategy 1: Exact language code match
      let exactMatch = voices.find(voice => voice.lang === targetLang);
      if (exactMatch) return exactMatch;

      // Strategy 2: Case-insensitive exact match
      exactMatch = voices.find(voice => 
        voice.lang.toLowerCase() === targetLang.toLowerCase()
      );
      if (exactMatch) return exactMatch;

      // Strategy 3: Base language match (e.g., 'hi' for 'hi-IN')
      const baseLanguage = targetLang.substring(0, 2);
      const baseMatch = voices.find(voice => 
        voice.lang.startsWith(baseLanguage + '-') || 
        voice.lang === baseLanguage ||
        voice.lang.includes(baseLanguage)
      );
      if (baseMatch) return baseMatch;

      // Strategy 4: Language family matching for all languages
      const languageFamilyMap = {
        // Indian Languages
        'hi': ['hi', 'hin', 'hindi'],
        'ta': ['ta', 'tam', 'tamil'],
        'te': ['te', 'tel', 'telugu'],
        'bn': ['bn', 'ben', 'bengali'],
        'gu': ['gu', 'guj', 'gujarati'],
        'kn': ['kn', 'kan', 'kannada'],
        'ml': ['ml', 'mal', 'malayalam'],
        'mr': ['mr', 'mar', 'marathi'],
        'pa': ['pa', 'pan', 'punjabi'],
        'ur': ['ur', 'urd', 'urdu'],
        'or': ['or', 'ori', 'odia'],
        'as': ['as', 'asm', 'assamese'],
        'ne': ['ne', 'nep', 'nepali'],
        'sa': ['sa', 'san', 'sanskrit'],
        
        // European Languages
        'en': ['en', 'eng', 'english'],
        'fr': ['fr', 'fre', 'french'],
        'de': ['de', 'ger', 'german'],
        'es': ['es', 'spa', 'spanish'],
        'it': ['it', 'ita', 'italian'],
        'pt': ['pt', 'por', 'portuguese'],
        'nl': ['nl', 'dut', 'dutch'],
        'sv': ['sv', 'swe', 'swedish'],
        'no': ['no', 'nor', 'norwegian'],
        'da': ['da', 'dan', 'danish'],
        'fi': ['fi', 'fin', 'finnish'],
        'pl': ['pl', 'pol', 'polish'],
        'ru': ['ru', 'rus', 'russian'],
        'uk': ['uk', 'ukr', 'ukrainian'],
        'cs': ['cs', 'cze', 'czech'],
        'sk': ['sk', 'slo', 'slovak'],
        'hu': ['hu', 'hun', 'hungarian'],
        'ro': ['ro', 'rum', 'romanian'],
        'bg': ['bg', 'bul', 'bulgarian'],
        'hr': ['hr', 'hrv', 'croatian'],
        'sl': ['sl', 'slv', 'slovenian'],
        'et': ['et', 'est', 'estonian'],
        'lv': ['lv', 'lav', 'latvian'],
        'lt': ['lt', 'lit', 'lithuanian'],
        'el': ['el', 'gre', 'greek'],
        'tr': ['tr', 'tur', 'turkish'],
        'is': ['is', 'ice', 'icelandic'],
        'mt': ['mt', 'mlt', 'maltese'],
        
        // Asian Languages
        'ja': ['ja', 'jpn', 'japanese'],
        'ko': ['ko', 'kor', 'korean'],
        'zh': ['zh', 'chi', 'chinese'],
        'th': ['th', 'tha', 'thai'],
        'vi': ['vi', 'vie', 'vietnamese'],
        'id': ['id', 'ind', 'indonesian'],
        'ms': ['ms', 'may', 'malay'],
        'fil': ['fil', 'tag', 'filipino'],
        'ar': ['ar', 'ara', 'arabic'],
        'he': ['he', 'heb', 'hebrew'],
        'fa': ['fa', 'per', 'persian'],
        
        // African & Other Languages
        'af': ['af', 'afr', 'afrikaans'],
        'sw': ['sw', 'swa', 'swahili'],
        'am': ['am', 'amh', 'amharic'],
        'yo': ['yo', 'yor', 'yoruba'],
        'ig': ['ig', 'ibo', 'igbo'],
        'ha': ['ha', 'hau', 'hausa'],
        'zu': ['zu', 'zul', 'zulu'],
        'xh': ['xh', 'xho', 'xhosa'],
        'st': ['st', 'sot', 'sotho'],
        'tn': ['tn', 'tsn', 'tswana'],
        'so': ['so', 'som', 'somali'],
        'rw': ['rw', 'kin', 'kinyarwanda'],
        'lg': ['lg', 'lug', 'luganda'],
        'mg': ['mg', 'mlg', 'malagasy'],
        'ht': ['ht', 'hat', 'haitian'],
        'qu': ['qu', 'que', 'quechua'],
        'gn': ['gn', 'grn', 'guarani'],
        'ay': ['ay', 'aym', 'aymara'],
        'mi': ['mi', 'mao', 'maori'],
        'haw': ['haw', 'haw', 'hawaiian'],
        'fj': ['fj', 'fij', 'fijian'],
        'sm': ['sm', 'smo', 'samoan'],
        'to': ['to', 'ton', 'tongan'],
        'ty': ['ty', 'tah', 'tahitian']
      };
      
      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
      const familyMatch = voices.find(voice => 
        familyCodes.some(code => 
          voice.lang.toLowerCase().includes(code.toLowerCase())
        )
      );
      
      if (familyMatch) return familyMatch;

      // Strategy 5: Fallback to any available voice
      return voices[0];
    };

    const voice = findBestVoice(selectedLang);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang; // Use the voice's actual language code
    } else {
      // Don't proceed if no voice is available
      toast.error(`No voice available for ${selectedLang}. Please try another language.`);
      return;
    }
    
    utter.rate = 0.8; // Slower for better pronunciation
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  const handleCompleteModule = () => {
    // Mark module as complete and navigate back
    toast.success('Module 1 completed successfully!');
    navigate(-1);
  };

  const baseLang = (selectedLang || 'en-US').split('-')[0];
  const completionMsg = baseLang === 'en'
    ? 'Complete this module to unlock Module 2'
    : baseLang === 'hi'
    ? 'मॉड्यूल 2 को अनलॉक करने के लिए इस मॉड्यूल को पूरा करें'
    : 'मॉड्यूल 2 अनलॉक करण्यासाठी हे मॉड्यूल पूर्ण करा';

  const t = React.useMemo(() => {
    if (baseLang === 'hi') {
      return {
        introTitle: 'पाठ 1: अपने सपनों को समझना',
        introSubtitle: 'जानें कि आपके परिवार के भविष्य के लिए वित्तीय सुरक्षा का क्या मतलब है',
        learnTitle: 'इस पाठ में आप क्या सीखेंगे',
        listen: 'सुनें',
        stop: 'रोकें',
        outcomesTitle: 'परिणाम',
        toolsTitle: 'आप जिन उपकरणों का उपयोग करेंगे',
        paragraph:
          'इस पाठ में, आप अपने सबसे महत्वपूर्ण सपनों को स्पष्ट करेंगे और जानेंगे कि उन्हें शुरुआती चरण में सुरक्षित करना क्यों आवश्यक है। हम व्यावहारिक कदम बताएंगे जिससे आप एक मजबूत वित्तीय नींव बना सकें जो अनिश्चित परिस्थितियों में भी आपके सपनों को ट्रैक पर रखे।',
        outcomes: ['• अपने लक्ष्यों को परिभाषित और प्राथमिकता दें', '• प्रमुख जोखिम और सुरक्षा को समझें', '• एक सरल कार्ययोजना बनाएँ', '• तिमाही समीक्षा क्या करें जानें'],
        tools: ['• ड्रीम बिल्डर चेकलिस्ट', '• जोखिम मूल्यांकन पॉइंटर्स', '• स्टार्टर प्रोटेक्शन मिक्स', '• समीक्षा आवृत्ति टेम्पलेट'],
        audioSection: 'सेक्शन 2: ऑडियो विवरण',
        chooseNarration: 'वर्णन भाषा चुनें',
        listenToLesson: 'पाठ सुनें',
        hoverToFlip: 'फ्लिप करने हेतु होवर करें',
        summary: 'सारांश',
        studyKeyIdeas: 'मुख्य विचारों का अध्ययन करने के लिए स्वाइप या होवर करें',
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'पाठ 1: तुमचे स्वप्ने समजून घेणे',
        introSubtitle: 'तुमच्या कुटुंबाच्या भविष्यासाठी आर्थिक सुरक्षा म्हणजे काय हे जाणून घ्याल. आम्ही व्यावहारिक पावले सांगू ज्यामुळे तुम्ही एक मजबूत आर्थिक पाया तयार करू शकता जो अनिश्चिततेतही स्वप्ने मार्गावर ठेवतो.',
        learnTitle: 'या धड्यात तुम्ही काय शिकाल',
        listen: 'ऐका',
        stop: 'थांबवा',
        outcomesTitle: 'परिणाम',
        toolsTitle: 'तुम्ही वापरणारी साधने',
        paragraph:
          'या धड्यात, तुम्ही तुमची सर्वात महत्त्वाची स्वप्ने स्पष्ट कराल आणि त्यांना लवकर संरक्षित करणे का आवश्यक आहे हे जाणून घ्याल. आम्ही व्यावहारिक पावले सांगू ज्यामुळे तुम्ही एक मजबूत आर्थिक पाया तयार करू शकता जो अनिश्चिततेतही स्वप्ने मार्गावर ठेवतो.',
        outcomes: ['• ध्येये परिभाषित करा आणि प्राधान्य द्या', '• प्रमुख धोके आणि संरक्षण समजा', '• साधी कृती योजना तयार करा', '• तिमाही पुनरावलोकन काय करायचे ते जाणून घ्या'],
        tools: ['• ड्रीम बिल्डर चेकलिस्ट', '• जोखीम मूल्यांकन पॉईंटर्स', '• स्टार्टर प्रोटेक्शन मिक्स', '• पुनरावलोकन वारंवारता टेम्पलेट'],
        audioSection: 'विभाग 2: ऑडिओ निवेदन',
        chooseNarration: 'निवेदन भाषा निवडा',
        listenToLesson: 'पाठ ऐका',
        hoverToFlip: 'फ्लिपसाठी होवर करा',
        summary: 'सारांश',
        studyKeyIdeas: 'महत्त्वाच्या कल्पना अभ्यासण्यासाठी स्वाइप किंवा होवर करा',
      };
    }
    return {
      introTitle: 'Lesson 1: Understanding Your Dreams',
      introSubtitle: "Discover what financial security means for your family's future",
      learnTitle: "What You'll Learn in This Lesson",
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Outcomes',
      toolsTitle: "Tools You'll Use",
      paragraph:
        "In this lesson, you'll clarify your most important dreams and learn why protecting them early is essential. We'll outline practical steps to start building a strong financial foundation that keeps those dreams on track even when life is uncertain.",
      outcomes: ['• Define and prioritize your goals', '• Understand key risks and protections', '• Draft a simple action plan', '• Know what to review quarterly'],
      tools: ['• Dream Builder checklist', '• Risk assessment pointers', '• Starter protection mix', '• Review cadence template'],
      audioSection: 'Section 2: Audio Narration',
      chooseNarration: 'Choose Narration Language',
      listenToLesson: 'Listen to Lesson',
      hoverToFlip: 'Hover to flip',
      summary: 'Summary',
      studyKeyIdeas: 'Swipe or hover to study key ideas',
    };
  }, [baseLang]);

  const studyCards = React.useMemo(() => {
    if (baseLang === 'hi') {
      return [
        {
          title: 'आपके सपने क्या हैं?',
          front: ['मुख्य जीवन लक्ष्यों की पहचान', 'लघु/दीर्घकालिक आकांक्षाएं सूचीबद्ध करें', 'प्रभाव और समयरेखा के आधार पर प्राथमिकता'],
          back: 'अपने और अपने परिवार के लिए सबसे महत्वपूर्ण लक्ष्यों को स्पष्ट करें।',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'सपनों को सुरक्षा क्यों चाहिए',
          front: ['जोखिम समझें: आय हानि, चिकित्सा खर्च', 'बीमा अनिश्चितता कैसे घटाता है', 'प्रोएक्टिव योजना से दृढ़ता बनाएं'],
          back: 'अनपेक्षित घटनाओं से सपनों की रक्षा हेतु सुरक्षा आवश्यक है।',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'मजबूत नींव बनाएं',
          front: ['स्पष्ट वित्तीय माइलस्टोन', 'आपातकालीन बचत व बेसिक प्रोटेक्शन', 'नियमित समीक्षा व सुधार'],
          back: 'सरल, टिकाऊ आधार आपके सपनों को ट्रैक पर रखता है।',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'তुमची स्वপ्ने काय आहेत?',
          front: ['महत्त्वाची जीवनध्येये ओळखा', 'लघु/दीर्घकालीन आकांक्षा यादी करा', 'परिणाम व कालरेषेनुसार प्राधान्य'],
          back: 'स्वतःसाठी व कुटुंबासाठी सर्वात महत्त्वाची ध्येये स्पष्ट करा.',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'स्वप्नांना सुरक्षा का आवश्यक',
          front: ['जोखीम समजून घ्या: उत्पन्न घट, वैद्यकीय खर्च', 'विमा अनिश्चितता कशी कमी करतो', 'सक्रिय नियोजनाने लवचिकता'],
          back: 'अनपेक्षित घटनांपासून स्वप्ने वाचवण्यासाठी संरक्षण गरजेचे आहे.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'मजबूत पाया तयार करा',
          front: ['स्पष्ट आर्थिक मैलाचे दगड', 'आणीबाणी बचत व मूलभूत संरक्षण', 'नियमित पुनरावलोकन व सुधारणा'],
          back: 'सोपी, टिकाऊ पायाभरणी स्वप्ने मार्गावर ठेवते.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    return [
      {
        title: 'What Are Your Dreams?',
        front: ['Identify key life goals', 'List short/long-term aspirations', 'Prioritize by impact and timeline'],
        back: 'Clarify the most important goals for you and your family.',
        color: 'from-pink-50 to-rose-50 border-pink-100',
      },
      {
        title: 'Why Dreams Need Protection',
        front: ['Understand risks: income loss, medical', 'How insurance reduces uncertainty', 'Resilience through proactive planning'],
        back: 'Protection keeps your plans intact when life is uncertain.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Build a Strong Foundation',
        front: ['Set clear milestones', 'Emergency savings and protection', 'Review and adjust regularly'],
        back: 'A simple, durable base keeps dreams on track.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
    ];
  }, [baseLang]);

  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'पीडीएफ दस्तावेज', open: 'खोलें', download: 'डाउनलोड' };
    if (baseLang === 'mr') return { title: 'PDF दस्तऐवज', open: 'उघडा', download: 'डाउनलोड' };
    return { title: 'PDF Document', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Lesson1Understanding_Your_Dream.pdf';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {uiText.backToModules}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
          </div>

          {/* Study Card Carousel (Flipping cards) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {studyCards.map((card, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <div className="group [perspective:1000px] h-[220px]">
                        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} border rounded-xl p-6 shadow-sm [backface-visibility:hidden]`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {card.front.map((pt, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-gray-500 mt-4">{baseLang === 'hi' ? 'फ्लिप करने हेतु होवर करें' : baseLang === 'mr' ? 'फ्लिपसाठी होवर करा' : 'Hover to flip'}</p>
                          </div>
                          {/* Back */}
                          <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">{baseLang === 'hi' ? 'मुख्य विचारों का अध्ययन करें' : baseLang === 'mr' ? 'महत्त्वाच्या कल्पना अभ्यासा' : 'Study key ideas'}</p>
          </div>

          {/* Section Description with TTS and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{t.learnTitle}</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    // Stop any currently playing audio when language changes
                    const synth = window.speechSynthesis;
                    if (synth) {
                      synth.cancel();
                      setSpeakingBlocks({});
                    }
                    setSelectedLang(e.target.value);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <optgroup label="🌍 English Variants">
                    {languageOptions.filter(opt => opt.code.startsWith('en-')).map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                  </optgroup>
                  <optgroup label="🇮🇳 Indian Languages">
                    {languageOptions.filter(opt => opt.code.includes('-IN')).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🇪🇺 European Languages">
                    {languageOptions.filter(opt => 
                      ['fr-', 'de-', 'es-', 'it-', 'pt-', 'nl-', 'sv-', 'no-', 'da-', 'fi-', 'pl-', 'ru-', 'uk-', 'cs-', 'sk-', 'hu-', 'ro-', 'bg-', 'hr-', 'sl-', 'et-', 'lv-', 'lt-', 'el-', 'tr-', 'is-', 'mt-'].some(prefix => opt.code.startsWith(prefix))
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🌏 Asian Languages">
                    {languageOptions.filter(opt => 
                      ['ja-', 'ko-', 'zh-', 'th-', 'vi-', 'id-', 'ms-', 'fil-', 'ar-', 'he-', 'fa-', 'hi-PK', 'ur-PK', 'bn-BD', 'si-', 'my-', 'km-', 'lo-', 'mn-', 'ka-', 'hy-', 'az-', 'kk-', 'ky-', 'uz-', 'tg-', 'tk-'].some(prefix => opt.code.startsWith(prefix) || opt.code === prefix)
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                </select>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(() => {
                    // Enhanced voice filtering with fallback strategies
                    const findBestVoices = (targetLang) => {
                      const baseLanguage = targetLang.substring(0, 2);
                      
                      // Strategy 1: Exact language code match
                      let exactMatches = voices.filter(voice => voice.lang === targetLang);
                      
                      // Strategy 2: Case-insensitive exact match
                      if (exactMatches.length === 0) {
                        exactMatches = voices.filter(voice => 
                          voice.lang.toLowerCase() === targetLang.toLowerCase()
                        );
                      }
                      
                      // Strategy 3: Base language match
                      const baseMatches = voices.filter(voice => 
                        voice.lang.startsWith(baseLanguage + '-') || 
                        voice.lang === baseLanguage ||
                        voice.lang.includes(baseLanguage)
                      );
                      
                      // Strategy 4: Language family matching
                      const languageFamilyMap = {
                        'hi': ['hi', 'hin', 'hindi'],
                        'ta': ['ta', 'tam', 'tamil'],
                        'te': ['te', 'tel', 'telugu'],
                        'bn': ['bn', 'ben', 'bengali'],
                        'gu': ['gu', 'guj', 'gujarati'],
                        'kn': ['kn', 'kan', 'kannada'],
                        'ml': ['ml', 'mal', 'malayalam'],
                        'mr': ['mr', 'mar', 'marathi'],
                        'pa': ['pa', 'pan', 'punjabi'],
                        'ur': ['ur', 'urd', 'urdu'],
                        'or': ['or', 'ori', 'odia'],
                        'as': ['as', 'asm', 'assamese'],
                        'ne': ['ne', 'nep', 'nepali'],
                        'sa': ['sa', 'san', 'sanskrit'],
                        'en': ['en', 'eng', 'english']
                      };
                      
                      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
                      const familyMatches = voices.filter(voice => 
                        familyCodes.some(code => 
                          voice.lang.toLowerCase().includes(code.toLowerCase())
                        )
                      );
                      
                      // Combine all matches and remove duplicates
                      const allMatches = [...exactMatches, ...baseMatches, ...familyMatches];
                      const uniqueMatches = allMatches.filter((voice, index, self) => 
                        index === self.findIndex(v => v.name === voice.name)
                    );
                      
                      return uniqueMatches;
                    };
                    
                    const bestVoices = findBestVoices(selectedLang);
                    
                    if (bestVoices.length > 0) {
                      return bestVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">No suitable voice found</option>;
                    }
                  })()}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button onClick={handleFullScreen} variant="outline" size="icon" className="p-2">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', t.paragraph)}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? t.stop : t.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">{t.outcomesTitle}</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">{t.toolsTitle}</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: PDF Document */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{pdfUi.title}</h3>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> {pdfUi.open}
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> {pdfUi.download}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-white">
              {/* PDF Viewer - Like Module 2 */}
              <div className="w-full h-[60vh]">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="Lesson 1 Understanding PDF"
                  frameBorder="0"
                >
                  <p className="p-4 text-gray-600">
                    {baseLang === 'hi' ? 'आपका ब्राउज़र PDF नहीं दिखा सकता।' : 
                     baseLang === 'mr' ? 'तुमचा ब्राउज़र PDF दाखवू शकत नाही.' : 
                     'Your browser does not support PDF viewing.'}
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {baseLang === 'hi' ? 'यहां क्लिक करें' : baseLang === 'mr' ? 'येथे क्लिक करा' : 'Click here'}
                    </a>
                    {baseLang === 'hi' ? 'PDF देखने के लिए' : baseLang === 'mr' ? 'PDF पहण्यासाठी' : 'to view the PDF'}
                  </p>
                </iframe>
              </div>
              

            </div>
            <div className="mt-3 text-sm text-gray-500 text-center">
              {baseLang === 'hi' ? 'PDF फ़ाइल: Lesson1Understanding_Your_Dream.pdf' : 
               baseLang === 'mr' ? 'PDF फाईल: Lesson1Understanding_Your_Dream.pdf' : 
               'PDF File: Lesson1Understanding_Your_Dream.pdf'}
            </div>
          </div>
        </section>

        {/* Section 3: Audio Narration (Translated) */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.audioSection}</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              {baseLang === 'hi' ? 'यह भाषा केवल ऑडियो के लिए है, पूरे पेज की भाषा नहीं बदलेगी' : 
               baseLang === 'mr' ? 'ही भाषा फक्त ऑडिओसाठी आहे, संपूर्ण पृष्ठाची भाषा बदलणार नाही' : 
               'This language is only for audio, it will not change the language of the entire page'}
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">{t.chooseNarration}</label>
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="en-US">🇺🇸 English</option>
                  <option value="hi-IN">🇮🇳 Hindi</option>
                  <option value="mr-IN">🇮🇳 Marathi</option>
                </select>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.listenToLesson}</h3>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  {/* Language-specific audio players */}
                  {audioLang === 'en-US' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/English.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'hi-IN' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/hindi.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'mr-IN' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/ma.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {audioLang === 'hi-IN' ? 'हिंदी ऑडियो फ़ाइल: /hindi.mp3' : 
                     audioLang === 'mr-IN' ? 'मराठी ऑडिओ फाईल: /ma.mp3' : 
                     'English audio file: /English.mp3'}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {audioLang === 'en-US' && 'High-quality English narration with clear pronunciation'}
                      {audioLang === 'hi-IN' && 'स्पष्ट उच्चारण के साथ उच्च गुणवत्ता वाली हिंदी कथा'}
                      {audioLang === 'mr-IN' && 'स्पष्ट उच्चारणासह उच्च गुणवत्तेची मराठी कथा'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Financial Protection Framework */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'वित्तीय सुरक्षा ढांचा' : baseLang === 'mr' ? 'आर्थिक सुरक्षा रचना' : 'Financial Protection Framework'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  level: baseLang === 'hi' ? 'स्तर 1: आधार' : baseLang === 'mr' ? 'स्तर 1: पाया' : 'Level 1: Foundation',
                  title: baseLang === 'hi' ? 'आपातकालीन बचत' : baseLang === 'mr' ? 'आणीबाणी बचत' : 'Emergency Savings',
                  description: baseLang === 'hi' ? '3-6 महीने का खर्च बचाएं' : baseLang === 'mr' ? '3-6 महिन्यांचा खर्च बचवा' : 'Save 3-6 months of expenses',
                  icon: '🛡️',
                  priority: 'High'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 2: सुरक्षा' : baseLang === 'mr' ? 'स्तर 2: संरक्षण' : 'Level 2: Protection',
                  title: baseLang === 'hi' ? 'बीमा कवरेज' : baseLang === 'mr' ? 'विमा कव्हरेज' : 'Insurance Coverage',
                  description: baseLang === 'hi' ? 'जीवन, स्वास्थ्य और दुर्घटना बीमा' : baseLang === 'mr' ? 'जीवन, आरोग्य आणि अपघात विमा' : 'Life, health and accident insurance',
                  icon: '🔄',
                  priority: 'High'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 3: विकास' : baseLang === 'mr' ? 'स्तर 3: विकास' : 'Level 3: Growth',
                  title: baseLang === 'hi' ? 'निवेश और बचत' : baseLang === 'mr' ? 'गुंतवणूक आणि बचत' : 'Investment & Savings',
                  description: baseLang === 'hi' ? 'दीर्घकालिक धन निर्माण' : baseLang === 'mr' ? 'दीर्घकालीन धन निर्माण' : 'Long-term wealth building',
                  icon: '📈',
                  priority: 'Medium'
                },
                {
                  level: baseLang === 'hi' ? 'स्तर 4: विरासत' : baseLang === 'mr' ? 'स्तर 4: वारसा' : 'Level 4: Legacy',
                  title: baseLang === 'hi' ? 'विरासत योजना' : baseLang === 'mr' ? 'वारसा योजना' : 'Legacy Planning',
                  description: baseLang === 'hi' ? 'भविष्य की पीढ़ियों के लिए योजना' : baseLang === 'mr' ? 'भविष्यातील पिढ्यांसाठी योजना' : 'Planning for future generations',
                  icon: '🏛️',
                  priority: 'Low'
                }
              ].map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {item.level}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            item.priority === 'High' ? 'bg-red-100 text-red-700' :
                            item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {item.priority === 'High' ? (baseLang === 'hi' ? 'उच्च' : baseLang === 'mr' ? 'उच्च' : 'High') :
                             item.priority === 'Medium' ? (baseLang === 'hi' ? 'मध्यम' : baseLang === 'mr' ? 'मध्यम' : 'Medium') :
                             (baseLang === 'hi' ? 'कम' : baseLang === 'mr' ? 'कमी' : 'Low')}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 text-center">
                {baseLang === 'hi' ? 'इस क्रम में अपनी वित्तीय सुरक्षा का निर्माण करें - आधार से शुरू करके ऊपर की ओर बढ़ें' : 
                 baseLang === 'mr' ? 'या क्रमाने तुमची आर्थिक सुरक्षा तयार करा - पायाभरणीपासून सुरुवात करून वरच्या दिशेने जा' : 
                 'Build your financial protection in this order - start from the foundation and work your way up'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Risk Assessment Flipping Cards */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'जोखिम मूल्यांकन' : baseLang === 'mr' ? 'जोखीम मूल्यांकन' : 'Risk Assessment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  front: baseLang === 'hi' ? 'आय हानि' : baseLang === 'mr' ? 'उत्पन्न घट' : 'Income Loss',
                  back: baseLang === 'hi' ? 'अचानक नौकरी छूटना या बीमारी के कारण आय बंद होना' : baseLang === 'mr' ? 'अचानक नोकरी गमावणे किंवा आजारामुळे उत्पन्न थांबणे' : 'Sudden job loss or illness stopping income',
                  color: 'from-red-50 to-pink-50 border-red-200'
                },
                {
                  front: baseLang === 'hi' ? 'चिकित्सा खर्च' : baseLang === 'mr' ? 'वैद्यकीय खर्च' : 'Medical Expenses',
                  back: baseLang === 'hi' ? 'अप्रत्याशित स्वास्थ्य समस्याओं के लिए बड़े खर्च' : baseLang === 'mr' ? 'अनपेक्षित आरोग्य समस्या साठी मोठे खर्च' : 'Large expenses for unexpected health issues',
                  color: 'from-orange-50 to-yellow-50 border-orange-200'
                },
                {
                  front: baseLang === 'hi' ? 'परिवार की जिम्मेदारी' : baseLang === 'mr' ? 'कुटुंबाची जबाबदारी' : 'Family Responsibility',
                  back: baseLang === 'hi' ? 'परिवार के सदस्यों की देखभाल और शिक्षा' : baseLang === 'mr' ? 'कुटुंबातील सदस्यांची काळजी आणि शिक्षण' : 'Caring for and educating family members',
                  color: 'from-blue-50 to-indigo-50 border-blue-200'
                },
                {
                  front: baseLang === 'hi' ? 'भविष्य की योजना' : baseLang === 'mr' ? 'भविष्यातील योजना' : 'Future Planning',
                  back: baseLang === 'hi' ? 'सेवानिवृत्ति, बचत और निवेश के लिए योजना' : baseLang === 'mr' ? 'निवृत्ती, बचत आणि गुंतवणूकीसाठी योजना' : 'Planning for retirement, savings and investments',
                  color: 'from-green-50 to-emerald-50 border-green-200'
                }
              ].map((card, idx) => (
                <div key={idx} className="group [perspective:1000px] h-48">
                  <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-xl p-6 shadow-sm [backface-visibility:hidden] flex items-center justify-center`}>
                      <h3 className="text-xl font-semibold text-gray-800 text-center">{card.front}</h3>
                    </div>
                    <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center`}>
                      <p className="text-gray-700 text-center leading-relaxed">{card.back}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Action Plan Builder */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'कार्य योजना निर्माता' : baseLang === 'mr' ? 'कृती योजना तयार करणारा' : 'Action Plan Builder'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'अल्पकालिक लक्ष्य (1-2 वर्ष)' : baseLang === 'mr' ? 'अल्पकालीन ध्येय (1-2 वर्ष)' : 'Short-term Goals (1-2 years)'}
                </h3>
                <div className="space-y-3">
                  {[
                    baseLang === 'hi' ? 'आपातकालीन बचत बनाएं' : baseLang === 'mr' ? 'आणीबाणी बचत तयार करा' : 'Build emergency savings',
                    baseLang === 'hi' ? 'बीमा कवरेज प्राप्त करें' : baseLang === 'mr' ? 'विमा कव्हरेज मिळवा' : 'Get insurance coverage',
                    baseLang === 'hi' ? 'ऋण को कम करें' : baseLang === 'mr' ? 'कर्ज कमी करा' : 'Reduce debt'
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'दीर्घकालिक लक्ष्य (5+ वर्ष)' : baseLang === 'mr' ? 'दीर्घकालीन ध्येय (5+ वर्ष)' : 'Long-term Goals (5+ years)'}
                </h3>
                <div className="space-y-3">
                  {[
                    baseLang === 'hi' ? 'बच्चों की शिक्षा के लिए बचत' : baseLang === 'mr' ? 'मुलांच्या शिक्षणासाठी बचत' : 'Save for children\'s education',
                    baseLang === 'hi' ? 'घर खरीदने की योजना' : baseLang === 'mr' ? 'घर खरेदीची योजना' : 'Plan for home purchase',
                    baseLang === 'hi' ? 'सेवानिवृत्ति की तैयारी' : baseLang === 'mr' ? 'निवृत्तीची तयारी' : 'Prepare for retirement'
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6.5: Interactive Quiz Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'अपने ज्ञान का परीक्षण करें' : baseLang === 'mr' ? 'तुमचे ज्ञान तपासा' : 'Test Your Knowledge'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  question: baseLang === 'hi' ? 'आपातकालीन बचत कितनी होनी चाहिए?' : baseLang === 'mr' ? 'आणीबाणी बचत किती असावी?' : 'How much emergency savings should you have?',
                  options: [
                    baseLang === 'hi' ? '1 महीने का खर्च' : baseLang === 'mr' ? '1 महिन्याचा खर्च' : '1 month of expenses',
                    baseLang === 'hi' ? '3-6 महीने का खर्च' : baseLang === 'mr' ? '3-6 महिन्यांचा खर्च' : '3-6 months of expenses',
                    baseLang === 'hi' ? '1 वर्ष का खर्च' : baseLang === 'mr' ? '1 वर्षाचा खर्च' : '1 year of expenses'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? '3-6 महीने का खर्च बचाना आदर्श है क्योंकि यह अधिकांश आपातकालीन स्थितियों को कवर करता है।' : baseLang === 'mr' ? '3-6 महिन्यांचा खर्च बचवणे आदर्श आहे कारण ते बहुतेक आणीबाणी परिस्थिती कव्हर करते.' : '3-6 months of expenses is ideal as it covers most emergency situations.'
                },
                {
                  question: baseLang === 'hi' ? 'जीवन बीमा कब लेना चाहिए?' : baseLang === 'mr' ? 'जीवन विमा कधी घ्यावा?' : 'When should you get life insurance?',
                  options: [
                    baseLang === 'hi' ? 'जब आप बीमार हों' : baseLang === 'mr' ? 'जेव्हा तुम्ही आजारी असाल' : 'When you are sick',
                    baseLang === 'hi' ? 'जब आप स्वस्थ हों' : baseLang === 'mr' ? 'जेव्हा तुम्ही निरोगी असाल' : 'When you are healthy',
                    baseLang === 'hi' ? 'जब आप बूढ़े हों' : baseLang === 'mr' ? 'जेव्हा तुम्ही वृद्ध असाल' : 'When you are old'
                  ],
                  correct: 1,
                  explanation: baseLang === 'hi' ? 'जब आप स्वस्थ हों तब बीमा लेना सबसे अच्छा है क्योंकि प्रीमियम कम होता है।' : baseLang === 'mr' ? 'जेव्हा तुम्ही निरोगी असाल तेव्हा विमा घेणे सर्वोत्तम आहे कारण प्रीमियम कमी असते.' : 'Getting insurance when you are healthy is best because premiums are lower.'
                }
              ].map((quiz, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-800 mb-4">{quiz.question}</h3>
                  <div className="space-y-2">
                    {quiz.options.map((option, optIdx) => (
                      <label key={optIdx} className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="radio" 
                          name={`quiz-${idx}`} 
                          value={optIdx} 
                          className="text-blue-600"
                          onChange={(e) => {
                            const selectedAnswer = parseInt(e.target.value);
                            setQuizAnswers(prev => ({
                              ...prev,
                              [idx]: selectedAnswer
                            }));
                          }}
                        />
                        <span className={`text-gray-700 ${
                          quizAnswers[idx] !== undefined && optIdx === quiz.correct ? 'font-semibold text-green-600' : ''
                        } ${
                          quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct ? 'font-semibold text-red-600' : ''
                        }`}>
                          {option}
                          {quizAnswers[idx] !== undefined && optIdx === quiz.correct && (
                            <span className="ml-2 text-green-600">✓</span>
                          )}
                          {quizAnswers[idx] !== undefined && optIdx === quizAnswers[idx] && optIdx !== quiz.correct && (
                            <span className="ml-2 text-red-600">✗</span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                  {quizAnswers[idx] !== undefined && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      quizAnswers[idx] === quiz.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`text-sm ${
                        quizAnswers[idx] === quiz.correct ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {quizAnswers[idx] === quiz.correct ? 
                          (baseLang === 'hi' ? 'सही उत्तर! ' : baseLang === 'mr' ? 'बरोबर उत्तर! ' : 'Correct! ') : 
                          (baseLang === 'hi' ? 'गलत उत्तर। ' : baseLang === 'mr' ? 'चुकीचे उत्तर। ' : 'Incorrect. ')
                        }
                        {quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Dream Visualization Board */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'सपनों का विज़ुअल बोर्ड' : baseLang === 'mr' ? 'स्वप्नांचे विज्युअल बोर्ड' : 'Dream Visualization Board'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {baseLang === 'hi' ? 'मेरे सपने' : baseLang === 'mr' ? 'माझी स्वप्ने' : 'My Dreams'}
                </h3>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                  <div className="space-y-3">
                    {[
                      baseLang === 'hi' ? '🏠 अपना घर' : baseLang === 'mr' ? '🏠 माझे घर' : '🏠 Own Home',
                      baseLang === 'hi' ? '🎓 बच्चों की शिक्षा' : baseLang === 'mr' ? '🎓 मुलांचे शिक्षण' : '🎓 Children\'s Education',
                      baseLang === 'hi' ? '🌍 विश्व यात्रा' : baseLang === 'mr' ? '🌍 जगभर प्रवास' : '🌍 World Travel',
                      baseLang === 'hi' ? '💼 सफल व्यवसाय' : baseLang === 'mr' ? '💼 यशस्वी व्यवसाय' : '💼 Successful Business'
                    ].map((dream, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm">
                        <span className="text-lg">{dream.split(' ')[0]}</span>
                        <span className="text-gray-700">{dream.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {baseLang === 'hi' ? 'सुरक्षा योजना' : baseLang === 'mr' ? 'संरक्षण योजना' : 'Protection Plan'}
                </h3>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="space-y-3">
                    {[
                      baseLang === 'hi' ? '🛡️ जीवन बीमा' : baseLang === 'mr' ? '🛡️ जीवन विमा' : '🛡️ Life Insurance',
                      baseLang === 'hi' ? '💊 स्वास्थ्य बीमा' : baseLang === 'mr' ? '💊 आरोग्य विमा' : '💊 Health Insurance',
                      baseLang === 'hi' ? '🚗 दुर्घटना बीमा' : baseLang === 'mr' ? '🚗 अपघात विमा' : '🚗 Accident Insurance',
                      baseLang === 'hi' ? '💰 आपातकालीन बचत' : baseLang === 'mr' ? '💰 आणीबाणी बचत' : '💰 Emergency Savings'
                    ].map((protection, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm">
                        <span className="text-lg">{protection.split(' ')[0]}</span>
                        <span className="text-gray-700">{protection.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Dream Achievement Timeline */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'सपनों की प्राप्ति का समय' : baseLang === 'mr' ? 'स्वप्नांच्या साध्याचा काळ' : 'Dream Achievement Timeline'}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {baseLang === 'hi' ? 'अपने सपनों को वास्तविकता में बदलने का रोडमैप' : 
               baseLang === 'mr' ? 'तुमच्या स्वप्नांना वास्तवात आणण्याचा रोडमॅप' : 
               'Roadmap to turn your dreams into reality'}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  year: '2024',
                  title: baseLang === 'hi' ? 'आपातकालीन निधि' : baseLang === 'mr' ? 'आणीबाणी निधी' : 'Emergency Fund',
                  description: baseLang === 'hi' ? '6 महीने के खर्च के बराबर बचत' : 
                               baseLang === 'mr' ? '6 महिन्यांच्या खर्चाइतकी बचत' : 
                               'Save 6 months of expenses',
                  icon: '💰',
                  status: 'active',
                  action: baseLang === 'hi' ? 'मासिक बचत: ₹25,000' : 
                         baseLang === 'mr' ? 'मासिक बचत: ₹25,000' : 
                         'Monthly Savings: ₹25,000'
                },
                {
                  year: '2025',
                  title: baseLang === 'hi' ? 'जीवन बीमा' : baseLang === 'mr' ? 'जीवन विमा' : 'Life Insurance',
                  description: baseLang === 'hi' ? 'परिवार की सुरक्षा के लिए कवरेज' : 
                               baseLang === 'mr' ? 'कुटुंबाच्या सुरक्षेसाठी कव्हरेज' : 
                               'Coverage for family protection',
                  icon: '🛡️',
                  status: 'pending',
                  action: baseLang === 'hi' ? 'बीमा एजेंट से संपर्क करें' : 
                         baseLang === 'mr' ? 'विमा एजंटाशी संपर्क साधा' : 
                         'Contact insurance agent'
                },
                {
                  year: '2026',
                  title: baseLang === 'hi' ? 'शिक्षा निधि' : baseLang === 'mr' ? 'शिक्षण निधी' : 'Education Fund',
                  description: baseLang === 'hi' ? 'बच्चों की उच्च शिक्षा के लिए बचत' : 
                               baseLang === 'mr' ? 'मुलांच्या उच्च शिक्षणासाठी बचत' : 
                               'Save for children\'s higher education',
                  icon: '🎓',
                  status: 'future',
                  action: baseLang === 'hi' ? 'योजना तैयार करें' : 
                         baseLang === 'mr' ? 'योजना तयार करा' : 
                         'Plan ahead'
                },
                {
                  year: '2028',
                  title: baseLang === 'hi' ? 'घर खरीदना' : baseLang === 'mr' ? 'घर खरेदी' : 'Home Purchase',
                  description: baseLang === 'hi' ? 'अपना सपनों का घर खरीदें' : 
                               baseLang === 'mr' ? 'तुमचे स्वप्नांचे घर खरेदी करा' : 
                               'Buy your dream home',
                  icon: '🏠',
                  status: 'future',
                  action: baseLang === 'hi' ? 'बचत जारी रखें' : 
                         baseLang === 'mr' ? 'बचत सुरू ठेवा' : 
                         'Continue saving'
                }
              ].map((milestone, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                      milestone.status === 'active' ? 'bg-blue-500 text-white' :
                      milestone.status === 'pending' ? 'bg-yellow-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      {milestone.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-600 bg-white px-2 py-1 rounded border">
                          {milestone.year}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          milestone.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          milestone.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {milestone.status === 'active' ? 
                            (baseLang === 'hi' ? 'चालू' : baseLang === 'mr' ? 'चालू' : 'Active') :
                           milestone.status === 'pending' ? 
                            (baseLang === 'hi' ? 'आगामी' : baseLang === 'mr' ? 'आगामी' : 'Upcoming') :
                            (baseLang === 'hi' ? 'भविष्य' : baseLang === 'mr' ? 'भविष्य' : 'Future')
                          }
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{milestone.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className={`w-2 h-2 rounded-full ${
                          milestone.status === 'active' ? 'bg-blue-500' :
                          milestone.status === 'pending' ? 'bg-yellow-500' :
                          'bg-gray-400'
                        }`}></span>
                        <span>{milestone.action}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                {baseLang === 'hi' ? 'सफलता के लिए टिप्स' : 
                 baseLang === 'mr' ? 'यशस्वी होण्यासाठी टिप्स' : 
                 'Tips for Success'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">1</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'एक समय में एक लक्ष्य पर ध्यान दें' : 
                     baseLang === 'mr' ? 'एकावेळी एक ध्येयावर लक्ष केंद्रित करा' : 
                     'Focus on one goal at a time'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">2</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'नियमित रूप से प्रगति की जांच करें' : 
                     baseLang === 'mr' ? 'नियमितपणे प्रगती तपासा' : 
                     'Regularly review progress'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">3</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'छोटे लक्ष्यों से शुरू करें' : 
                     baseLang === 'mr' ? 'लहान ध्येयांपासून सुरुवात करा' : 
                     'Start with small goals'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">4</span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {baseLang === 'hi' ? 'उत्सव मनाएं और प्रेरित रहें' : 
                     baseLang === 'mr' ? 'साजरा करा आणि प्रेरित रहा' : 
                     'Celebrate wins and stay motivated'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
              {/* Troubleshooting Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'समस्या समाधान' : baseLang === 'mr' ? 'समस्या सोडवणे' : 'Troubleshooting'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'आवाज नहीं आ रही है?' : baseLang === 'mr' ? 'आवाज येत नाही?' : 'Voice not working?'}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'पेज को रिफ्रेश करें' : baseLang === 'mr' ? 'पृष्ठ रिफ्रेश करा' : 'Refresh the page'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'अलग भाषा चुनें' : baseLang === 'mr' ? 'वेगळी भाषा निवडा' : 'Try a different language'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'ब्राउज़र अपडेट करें' : baseLang === 'mr' ? 'ब्राउज़र अपडेट करा' : 'Update your browser'}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-700">
                  {baseLang === 'hi' ? 'हिंदी आवाज के लिए' : baseLang === 'mr' ? 'हिंदी आवाजीसाठी' : 'For Hindi voice'}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'Windows: Settings > Time & Language > Language' : baseLang === 'mr' ? 'Windows: सेटिंग्ज > वेळ आणि भाषा > भाषा' : 'Windows: Settings > Time & Language > Language'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'हिंदी भाषा पैक पैक इंस्टॉल करें' : baseLang === 'mr' ? 'हिंदी भाषा पॅक इन्स्टॉल करा' : 'Install Hindi language pack'}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{baseLang === 'hi' ? 'स्पीच पैक भी जोड़ें' : baseLang === 'mr' ? 'स्पीच पॅक देखील जोडा' : 'Add speech pack too'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      
      {/* Module Completion */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">{completionMsg}</div>
            <Button 
              onClick={handleCompleteModule}
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
            >
              {uiText.complete}
            </Button>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <div className="flex items-center justify-between gap-3">
              <DialogTitle className="text-xl font-bold flex items-center gap-3 min-w-0">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 text-pink-700 text-sm">💡</span>
                <span className="truncate">{t.introTitle}</span>
              </DialogTitle>
              <div className="flex items-center gap-2 flex-wrap bg-gray-50 border rounded-lg px-3 py-2">
                <label className="text-xs text-gray-600">Language</label>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="border rounded px-2 py-1 text-sm h-8"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                <label className="text-xs text-gray-600">Voice</label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(() => {
                    // Enhanced voice filtering with fallback strategies
                    const findBestVoices = (targetLang) => {
                      const baseLanguage = targetLang.substring(0, 2);
                      
                      // Strategy 1: Exact language code match
                      let exactMatches = voices.filter(voice => voice.lang === targetLang);
                      
                      // Strategy 2: Case-insensitive exact match
                      if (exactMatches.length === 0) {
                        exactMatches = voices.filter(voice => 
                          voice.lang.toLowerCase() === targetLang.toLowerCase()
                        );
                      }
                      
                      // Strategy 3: Base language match
                      const baseMatches = voices.filter(voice => 
                        voice.lang.startsWith(baseLanguage + '-') || 
                        voice.lang === baseLanguage ||
                        voice.lang.includes(baseLanguage)
                      );
                      
                      // Strategy 4: Language family matching
                      const languageFamilyMap = {
                        'hi': ['hi', 'hin', 'hindi'],
                        'ta': ['ta', 'tam', 'tamil'],
                        'te': ['te', 'tel', 'telugu'],
                        'bn': ['bn', 'ben', 'bengali'],
                        'gu': ['gu', 'guj', 'gujarati'],
                        'kn': ['kn', 'kan', 'kannada'],
                        'ml': ['ml', 'mal', 'malayalam'],
                        'mr': ['mr', 'mar', 'marathi'],
                        'pa': ['pa', 'pan', 'punjabi'],
                        'ur': ['ur', 'urd', 'urdu'],
                        'or': ['or', 'ori', 'odia'],
                        'as': ['as', 'asm', 'assamese'],
                        'ne': ['ne', 'nep', 'nepali'],
                        'sa': ['sa', 'san', 'sanskrit'],
                        'en': ['en', 'eng', 'english']
                      };
                      
                      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
                      const familyMatches = voices.filter(voice => 
                        familyCodes.some(code => 
                          voice.lang.toLowerCase().includes(code.toLowerCase())
                        )
                      );
                      
                      // Combine all matches and remove duplicates
                      const allMatches = [...exactMatches, ...baseMatches, ...familyMatches];
                      const uniqueMatches = allMatches.filter((voice, index, self) => 
                        index === self.findIndex(v => v.name === voice.name)
                      );
                      
                      return uniqueMatches;
                    };
                    
                    const bestVoices = findBestVoices(selectedLang);
                    
                    if (bestVoices.length > 0) {
                      return bestVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">No suitable voice found</option>;
                    }
                  })()}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button variant="outline" size="sm" className="h-8" onClick={() => setIsFullScreenModalOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto py-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
                <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 mb-8">
                <div className="flex items-center justify-end mb-4">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                    onClick={() => handleSpeakToggle('modal-lesson-text', t.paragraph)}
                  >
                    {speakingBlocks['modal-lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                    {speakingBlocks['modal-lesson-text'] ? t.stop : t.listen}
                  </Button>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{t.paragraph}</p>
              </div>

              {/* Carousel inside modal (Flipping) */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <Carousel className="w-full">
                  <CarouselContent>
                    {studyCards.map((card, idx) => (
                      <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                        <div className="group [perspective:1000px] h-[220px]">
                          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} border rounded-xl p-6 shadow-sm [backface-visibility:hidden]`}>
                              <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                              <ul className="text-sm text-gray-700 space-y-2">
                                {card.front.map((pt, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="text-xs text-gray-500 mt-4">{baseLang === 'hi' ? 'फ्लिप करने हेतु होवर करें' : baseLang === 'mr' ? 'फ्लिपसाठी होवर करा' : 'Hover to flip'}</p>
                            </div>
                            <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                              <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                              <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4" />
                  <CarouselNext className="-right-4" />
                </Carousel>
              </div>

              {/* Additional sections in modal */}
              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'वित्तीय सुरक्षा ढांचा' : baseLang === 'mr' ? 'आर्थिक सुरक्षा रचना' : 'Financial Protection Framework'}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      level: baseLang === 'hi' ? 'स्तर 1: आधार' : baseLang === 'mr' ? 'स्तर 1: पाया' : 'Level 1: Foundation',
                      title: baseLang === 'hi' ? 'आपातकालीन बचत' : baseLang === 'mr' ? 'आणीबाणी बचत' : 'Emergency Savings',
                      icon: '🛡️',
                      priority: 'High'
                    },
                    {
                      level: baseLang === 'hi' ? 'स्तर 2: सुरक्षा' : baseLang === 'mr' ? 'स्तर 2: संरक्षण' : 'Level 2: Protection',
                      title: baseLang === 'hi' ? 'बीमा कवरेज' : baseLang === 'mr' ? 'विमा कव्हरेज' : 'Insurance Coverage',
                      icon: '🔄',
                      priority: 'High'
                    },
                    {
                      level: baseLang === 'hi' ? 'स्तर 3: विकास' : baseLang === 'mr' ? 'स्तर 3: विकास' : 'Level 3: Growth',
                      title: baseLang === 'hi' ? 'निवेश और बचत' : baseLang === 'mr' ? 'गुंतवणूक आणि बचत' : 'Investment & Savings',
                      icon: '📈',
                      priority: 'Medium'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              {item.level}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.priority === 'High' ? 'bg-red-100 text-red-700' :
                              item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {item.priority === 'High' ? (baseLang === 'hi' ? 'उच्च' : baseLang === 'mr' ? 'उच्च' : 'High') :
                               item.priority === 'Medium' ? (baseLang === 'hi' ? 'मध्यम' : baseLang === 'mr' ? 'मध्यम' : 'Medium') :
                               (baseLang === 'hi' ? 'कम' : baseLang === 'mr' ? 'कमी' : 'Low')}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                        </div>
                        <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-gray-600">{idx + 1}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'जोखिम मूल्यांकन' : baseLang === 'mr' ? 'जोखीम मूल्यांकन' : 'Risk Assessment'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      front: baseLang === 'hi' ? 'आय हानि' : baseLang === 'mr' ? 'उत्पन्न घट' : 'Income Loss',
                      back: baseLang === 'hi' ? 'अचानक नौकरी छूटना या बीमारी के कारण आय बंद होना' : baseLang === 'mr' ? 'अचानक नोकरी गमावणे किंवा आजारामुळे उत्पन्न थांबणे' : 'Sudden job loss or illness stopping income',
                      color: 'from-red-50 to-pink-50 border-red-200'
                    },
                    {
                      front: baseLang === 'hi' ? 'चिकित्सा खर्च' : baseLang === 'mr' ? 'वैद्यकीय खर्च' : 'Medical Expenses',
                      back: baseLang === 'hi' ? 'अप्रत्याशित स्वास्थ्य समस्याओं के लिए बड़े खर्च' : baseLang === 'mr' ? 'अनपेक्षित आरोग्य समस्या साठी मोठे खर्च' : 'Large expenses for unexpected health issues',
                      color: 'from-orange-50 to-yellow-50 border-orange-200'
                    }
                  ].map((card, idx) => (
                    <div key={idx} className="group [perspective:1000px] h-32">
                      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-xl p-4 shadow-sm [backface-visibility:hidden] flex items-center justify-center`}>
                          <h3 className="text-lg font-semibold text-gray-800 text-center">{card.front}</h3>
                        </div>
                        <div className={`absolute inset-0 bg-white border rounded-xl p-4 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center`}>
                          <p className="text-gray-700 text-center text-sm leading-relaxed">{card.back}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'कार्य योजना निर्माता' : baseLang === 'mr' ? 'कृती योजना तयार करणारा' : 'Action Plan Builder'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-gray-700">
                      {baseLang === 'hi' ? 'अल्पकालिक लक्ष्य (1-2 वर्ष)' : baseLang === 'mr' ? 'अल्पकालीन ध्येय (1-2 वर्ष)' : 'Short-term Goals (1-2 years)'}
                    </h3>
                    <div className="space-y-2">
                      {[
                        baseLang === 'hi' ? 'आपातकालीन बचत बनाएं' : baseLang === 'mr' ? 'आणीबाणी बचत तयार करा' : 'Build emergency savings',
                        baseLang === 'hi' ? 'बीमा कवरेज प्राप्त करें' : baseLang === 'mr' ? 'विमा कव्हरेज मिळवा' : 'Get insurance coverage'
                      ].map((goal, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-gray-700">
                      {baseLang === 'hi' ? 'दीर्घकालिक लक्ष्य (5+ वर्ष)' : baseLang === 'mr' ? 'दीर्घकालीन ध्येय (5+ वर्ष)' : 'Long-term Goals (5+ years)'}
                    </h3>
                    <div className="space-y-2">
                      {[
                        baseLang === 'hi' ? 'बच्चों की शिक्षा के लिए बचत' : baseLang === 'mr' ? 'मुलांच्या शिक्षणासाठी बचत' : 'Save for children\'s education',
                        baseLang === 'hi' ? 'घर खरीदने की योजना' : baseLang === 'mr' ? 'घर खरेदीची योजना' : 'Plan for home purchase'
                      ].map((goal, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'प्रगति ट्रैकर' : baseLang === 'mr' ? 'प्रगती ट्रॅकर' : 'Progress Tracker'}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: baseLang === 'hi' ? 'आपातकालीन बचत' : baseLang === 'mr' ? 'आणीबाणी बचत' : 'Emergency Savings',
                      progress: 60,
                      color: 'bg-blue-500'
                    },
                    {
                      title: baseLang === 'hi' ? 'जीवन बीमा कवरेज' : baseLang === 'mr' ? 'जीवन विमा कव्हरेज' : 'Life Insurance Coverage',
                      progress: 40,
                      color: 'bg-green-500'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{item.title}</span>
                        <span className="text-sm text-gray-500">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color} transition-all duration-500`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-8 mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  {baseLang === 'hi' ? 'वित्तीय लक्ष्य कैलकुलेटर' : baseLang === 'mr' ? 'आर्थिक ध्येय कॅल्क्युलेटर' : 'Financial Goal Calculator'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {baseLang === 'hi' ? 'अपने सपनों को वास्तविकता में बदलने के लिए अपने वित्तीय लक्ष्यों की योजना बनाएं' : 
                   baseLang === 'mr' ? 'तुमच्या स्वप्नांना वास्तवात आणण्यासाठी तुमच्या आर्थिक ध्येयांची योजना करा' : 
                   'Plan your financial goals to turn your dreams into reality'}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Emergency Fund Calculator */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💰</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'आपातकालीन निधि' : baseLang === 'mr' ? 'आणीबाणी निधी' : 'Emergency Fund'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'मासिक खर्च:' : baseLang === 'mr' ? 'मासिक खर्च:' : 'Monthly Expenses:'}
                        </span>
                        <span className="font-medium">₹25,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'लक्ष्य राशि:' : baseLang === 'mr' ? 'ध्येय रक्कम:' : 'Target Amount:'}
                        </span>
                        <span className="font-medium text-blue-600">₹1,50,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Life Insurance Calculator */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🛡️</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'जीवन बीमा' : baseLang === 'mr' ? 'जीवन विमा' : 'Life Insurance'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'वार्षिक आय:' : baseLang === 'mr' ? 'वार्षिक उत्पन्न:' : 'Annual Income:'}
                        </span>
                        <span className="font-medium">₹6,00,000</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'सुझाया गया कवरेज:' : baseLang === 'mr' ? 'सूचवलेले कव्हरेज:' : 'Recommended Coverage:'}
                        </span>
                        <span className="font-medium text-green-600">₹30,00,000</span>
                      </div>
                    </div>
                  </div>

                  {/* Education Fund Calculator */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🎓</span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {baseLang === 'hi' ? 'शिक्षा निधि' : baseLang === 'mr' ? 'शिक्षण निधी' : 'Education Fund'}
                      </h3>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'वर्तमान आयु:' : baseLang === 'mr' ? 'सध्याचे वय:' : 'Current Age:'}
                        </span>
                        <span className="font-medium">5 वर्ष</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {baseLang === 'hi' ? 'आवश्यक राशि:' : baseLang === 'mr' ? 'आवश्यक रक्कम:' : 'Required Amount:'}
                        </span>
                        <span className="font-medium text-purple-600">₹15,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-base font-semibold text-gray-800 mb-3">
                    {baseLang === 'hi' ? 'अपने लक्ष्यों को प्राप्त करने के लिए टिप्स' : 
                     baseLang === 'mr' ? 'तुमची ध्येये साध्य करण्यासाठी टिप्स' : 
                     'Tips to achieve your goals'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">1</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'हर महीने अपनी आय का 20% बचाएं' : 
                         baseLang === 'mr' ? 'दर महिन्याला तुमच्या उत्पन्नाचे 20% बचवा' : 
                         'Save 20% of your income every month'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">2</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'अपने लक्ष्यों को प्राथमिकता दें' : 
                         baseLang === 'mr' ? 'तुमच्या ध्येयांना प्राधान्य द्या' : 
                         'Prioritize your goals'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">3</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'नियमित रूप से अपनी प्रगति की जांच करें' : 
                         baseLang === 'mr' ? 'नियमितपणे तुमची प्रगती तपासा' : 
                         'Regularly review your progress'}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">4</span>
                      </div>
                      <p className="text-xs text-gray-700">
                        {baseLang === 'hi' ? 'पेशेवर सलाह लें' : 
                         baseLang === 'mr' ? 'व्यावसायिक सल्ला घ्या' : 
                         'Seek professional advice'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod1Dreams;
