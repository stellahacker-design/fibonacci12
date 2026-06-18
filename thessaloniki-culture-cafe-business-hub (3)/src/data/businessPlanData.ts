/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PorterForce, ServiceItem, MarketingCategory } from "../types/businessPlan";

export const EXECUTVE_SUMMARY = {
  title: "Επιχειρηματικό Σχέδιο: The Cult-Community Hub (Θεσσαλονίκη)",
  slogan: "Όπου η Street Art, η Αδρεναλίνη και ο Curated Καφές Δημιουργούν Κοινότητα",
  cover: {
    address: "Ίωνος Δραγούμη με Ερμού, Θεσσαλονίκη, 54624",
    phone: "2310 234 567",
    email: "info@cultcommunityhub.gr",
    website: "www.cultcommunityhub.gr",
    logoText: "CULT HUB",
    date: "Ιούλιος 2026",
    founders: "Στέλλα & Ηλίας (Founders & Creative Directors)"
  },
  introDescription: "Το 'The Cult-Community Hub' ιδρύθηκε στις αρχές του 2026 από τη Στέλλα και τον Ηλία στη Θεσσαλονίκη. Πρόκειται για έναν πρωτοποριακό, υβριδικό πολυχώρο που συνενώνει το specialty καφέ, την τέχνη (gallery, graffiti, exhibitions), την ψυχαγωγία, τη δημιουργική απασχόληση και τα extreme sports (indoor mini skate ramp). Ο χώρος είναι σχεδιασμένος με έντονα χρώματα, δυναμικά σχήματα και urban αισθητική, προσφέροντας στη νεολαία, τους skaters, τους καλλιτέχνες και τους φοιτητές ένα αυθεντικό στέκι με χαρακτήρα.",
  vision: "Το όραμά μας είναι να επαναπροσδιορίσουμε τον 'τρίτο χώρο' (third place) στην καρδιά της Θεσσαλονίκης. Δεν σχεδιάζουμε απλώς ένα ακόμη καφέ-μπαρ, αλλά ένα ζωντανό, πολυλειτουργικό οικοσύστημα όπου η underground και street κουλτούρα συναντά την υψηλή αισθητική, τις τέχνες και ο εναλλακτικός τρόπος ζωής. Στόχος μας είναι να αποτελέσουμε το επίκεντρο έκφρασης για τη δημιουργική κοινότητα της πόλης, προσφέροντας έναν ασφαλή, ανθρώπινο και εμπνευσμένο χώρο συνάντησης που συνδυάζει premium εμπειρίες με την καθημερινή ανάγκη για ποιοτική κοινωνικοποίηση.",
  mission: "Αποστολή μας είναι η οργανική σύνδεση των ανθρώπων μέσα από τη συνέργεια και τη δημιουργία. Προσφέροντας εξαιρετικής ποιότητας blends καφέ, επιλεγμένα snacks και ποτά, παράλληλα με μια εσωτερική mini skate ramp, μόνιμες εκθέσεις τέχνης και δυναμικά workshops, χτίζουμε μια κοινότητα με ισχυρή ταυτότητα. Αγκαλιάζουμε τους skaters, τους καλλιτέχνες, τους φοιτητές και κάθε περαστικό που αναζητά ένα στέκι με χαρακτήρα, δίνοντας έμφαση στις προσωπικές σχέσεις και το θετικό κοινωνικό αποτύπωμα.",
  values: [
    {
      title: "Κοινότητα & Συνέργεια",
      desc: "Χτίζουμε γέφυρες εμπιστοσύνης και συνεργασίας ανάμεσα σε τοπικούς δημιουργούς, αθλητές και επισκέπτες, μετατρέποντας τις απλές συναλλαγές σε ουσιαστικές σχέσεις."
    },
    {
      title: "Προσβασιμότητα & Συμπερίληψη",
      desc: "Ο χώρος και οι υπηρεσίες μας είναι ανοιχτά, φιλόξενα και προσβάσιμα σε όλους, χωρίς αποκλεισμούς, προάγοντας τον αλληλοσεβασμό."
    },
    {
      title: "Ασφάλεια & Επαγγελματισμός",
      desc: "Διασφαλίζουμε ένα καθαρό, ασφαλές περιβάλλον (τόσο στη mini ramp όσο και στην καθημερινή λειτουργία) με υψηλά πρότυπα εξυπηρέτησης."
    },
    {
      title: "Δημιουργικότητα & Ελεύθερη Έκφραση",
      desc: "Παρέχουμε το φυσικό και ψηφιακό 'καμβά' για να εκφράσουν νέοι καλλιτέχνες, tattoo artists και illustrators τις ιδέες τους χωρίς εμπόδια."
    },
    {
      title: "Εμπειρία Πάνω από την Κατανάλωση",
      desc: "Η πραγματική μας αξία δεν βρίσκεται στο περιθώριο κέρδους ενός καφέ, αλλά στο συναίσθημα, τη γνώση και τη μνήμη που αποκομίζει κάποιος περνώντας την πόρτα μας."
    }
  ],
  strategyGoals: {
    title: "Υφιστάμενη Στρατηγική και Στόχοι",
    positioning: "1. Στρατηγική Τοποθέτησης: «Ο πρώτος αυθεντικός πολυχώρος street κουλτούρας, τέχνης και extreme sports στη Θεσσαλονίκη».",
    product: "2. Στρατηγική Προϊόντος/Υπηρεσιών: Συνδυασμός κορυφαίου specialty coffee, takeaway εξυπηρέτησης, micro-drops ρούχων και workshops.",
    partnerships: "3. Στρατηγική Συνεργασιών: Σταθερή δικτύωση με την Καλών Τεχνών του ΑΠΘ, τοπικούς skate-related προμηθευτές και graphic designers.",
    marketing: "4. Στρατηγική Marketing: Guerilla ενέργειες στους δρόμους, street art workshops και Instagram/TikTok organically-produced drops.",
    smartIntro: "Στόχοι Επιχείρησης (SMART Goals):",
    shortTerm: "• Βραχυπρόθεσμοι (0-12 μήνες): Καθιέρωση Brand ID, +5.000 followers, επίτευξη break-even (280€ ημερήσιο τζίρο κατ' ελάχιστο) τον 2ο μήνα, διοργάνωση 1ης μεγάλης έκθεσης, 1 pop-up ρούχων ανά τρίμηνο.",
    mediumTerm: "• Μεσοπρόθεσμοι (12-24 μήνες): Μέση αύξηση ημερήσιου τζίρου στα 610€, κατασκευή mini ramp στο υπόγειο, σταθεροποίηση προσωπικού, 1 μεγάλο skate event, λανσάρισμα limited-merch (Own Brand) και 1 pop-up ανά εξάμηνο.",
    longTerm: "• Μακροπρόθεσμοι (3-5 έτη): Δημιουργία ετήσιου Urban Street Festival, σειρά custom σχεδιασμένων snowboards & skateboards, ίδρυση ακαδημίας skate, εκδρομές extreme sports.",
    implementationAction: "Στρατηγική Υλοποίησης Στόχων: Συνεχής παρακολούθηση των global street art trends, επένδυση στην εκπαίδευση του προσωπικού (baristas), αυστηρή χρηματοοικονομική διαχείριση και ενίσχυση του αισθήματος της κοινότητας (community loyalty)."
  },
  orgStructure: {
    title: "Οργανωτική Δομή & Διοίκηση",
    management: "Διοίκηση και Founder Roles: Η Στέλλα αναλαμβάνει το Curation, το Art Direction, το Marketing και τις Δημοτικές / Καλλιτεχνικές Δημόσιες Σχέσεις. Ο Ηλίας ηγείται των Operations, της Οικονομικής Διαχείρισης, των Logistical προμηθειών και της λειτουργίας της Mini Ramp.",
    staffRoles: "Υπάλληλοι & Αρμοδιότητες: 2 εξειδικευμένοι Baristas (πρωινή και απογευματινή βάρδια) που είναι υπεύθυνοι για το calibration, το σερβίρισμα και τη διατήρηση του high-vibe, και 1 Runner/Support (κατά τις ώρες αιχμής/βραδινά events) για τη mini ramp, τη λάντζα και την υποστήριξη."
  },
  resources: {
    title: "Πόροι και Ικανότητες",
    physical: `Φυσικοί Πόροι: Πολυώροφο ενοικιαζόμενο ακίνητο στη διασταύρωση Ερμού με Δραγούμη με ειδικά διαμορφωμένο υπόγειο για τη mini ramp, επώνυμο επαγγελματικό εξοπλισμό barista, ειδικούς φωτισμούς gallery και προβολείς.

• Πού βοηθάει: Ο φυσικός αυτός πόρος αποτελεί το «θεμέλιο λίθο» του υβριδικού χαρακτήρα του καταστήματος. Η τοποθεσία εξασφαλίζει υψηλό foot traffic και άμεση ορατότητα από το νεανικό/φοιτητικό κοινό, ενώ η mini ramp και ο gallery φωτισμός δίνουν φυσική υπόσταση στην street art και skate κουλτούρα.
• Τι προσφέρει στην επιχείρηση: Μειώνει δραστικά το Κόστος Απόκτησης Πελατών (CAC) λόγω της εξαιρετικής τοποθεσίας, αυξάνει κατακόρυφα το χρόνο παραμονής (dwell time), ενισχύει τον δείκτη up-selling (μεγαλύτερος μέσος όρος απόδειξης) και δημιουργεί άφθονο οργανικό περιεχομένο (UGC) για δωρεάν viral προβολή στα social media.`,
    intangible: `Άυλοι Πόροι: Ισχυρή τεχνογνωσία και εκπαίδευση specialty coffee, βαθιά εμπειρία πωλήσεων και διοργάνωσης events, ευρύ δίκτυο επαφών με Έλληνες street artists, οργανωμένο ψηφιακό brand και social media.

• Πού βοηθάει: Επιτρέπει στην επιχείρηση να λειτουργεί με κορυφαία ποιότητα, να διοργανώνει άψογα events χωρίς λειτουργικά σφάλματα και να διατηρεί άμεση επαφή με κορυφαίους καλλιτέχνες του δρόμου.
• Τι προσφέρει στην επιχείρηση: Η υψηλή ποιότητα specialty coffee εξασφαλίζει κορυφαίο Customer Retention και αυξημένο Customer Lifetime Value (LTV). Το δίκτυο καλλιτεχνών δίνει αποκλειστική πρόσβαση σε περιζήτητα merchandise drops, ενώ το ψηφιακό brand μεταφέρει οργανικά και δωρεάν το hype από τον ψηφιακό κόσμο στον φυσικό χώρο (O2O - Online to Offline conversion).`,
    competencies: `Ικανότητες (Core Competencies): Μοναδικός συνδυασμός αντίθετων υπηρεσιών (καφές, skate, art) σε ένα συνεκτικό, μη-αντιγράψιμο brand, υψηλή οργανωτική ικανότητα και άριστες επικοινωνιακές δεξιότητες.

• Πού βοηθάει: Επιτρέπει την απόλυτη διαφοροποίηση από τον παραδοσιακό ανταγωνισμό της εστίασης, γεφυρώνοντας φαινομενικά ετερόκλητα κοινά (skaters, creatives, coffee enthusiasts) κάτω από μια ενιαία, αυθεντική στέγη.
• Τι προσφέρει στην επιχείρηση: Δημιουργεί ένα ισχυρό προστατευτικό τείχος (competitive moat) που είναι εξαιρετικά δύσκολο να αντιγραφεί από εγχώριες ή διεθνείς αλυσίδες. Παράλληλα, μειώνει την ελαστικότητα τιμής των καταναλωτών (επιτρέποντας premium τιμολόγηση) και καθιστά το κατάστημα τον απόλυτο «τρίτο χώρο» (third place) της Θεσσαλονίκης.`
  }
};

export const PORTER_FORCES: PorterForce[] = [
  {
    id: "buyer-power",
    title: "Διαπραγματευτική Ισχύς Αγοραστών",
    titleEn: "Bargaining Power of Buyers",
    scale: "ΧΑΜΗΛΗ ΠΡΟΣ ΜΕΤΡΙΑ",
    scaleColor: "bg-emerald-950/40 text-emerald-400 border-emerald-800",
    description: "Οι τελικοί καταναλωτές έχουν πληθώρα επιλογών για απλό καφέ στη Θεσσαλονίκη, γεγονός που αυξάνει τη διαπραγματευτική τους ισχύ. Ωστόσο, ο εξειδικευμένος χαρακτήρας του Cult Hub (skate ramp, urban events, gallery) δημιουργεί υψηλό conversion και πιστότητα, μειώνοντας την ελαστικότητα τιμής.",
    subFactors: [
      "Ύπαρξη πολλών εναλλακτικών καφετεριών στη συμπρωτεύουσα (υψηλός βαθμός υποκατάστασης)",
      "Χαμηλό κόστος αλλαγής (switching cost) για απλό καφέ",
      "Υψηλή διαφοροποίηση του Thess Cult Hub (skate, art, streetwear)",
      "Ισχυρό brand loyalty και αίσθηση κοινότητας (community-driven approach)"
    ]
  },
  {
    id: "supplier-power",
    title: "Διαπραγματευτική Ισχύς Προμηθευτών",
    titleEn: "Bargaining Power of Suppliers",
    scale: "ΧΑΜΗΛΗ",
    scaleColor: "bg-emerald-950/40 text-emerald-400 border-emerald-800",
    description: "Υπάρχουν πολλοί roasters και εισαγωγείς specialty καφέ στη Θεσσαλονίκη, επιτρέποντας στην επιχείρηση να διαπραγματεύεται ευνοϊκούς όρους και να αλλάζει προμηθευτή χωρίς σημαντικές επιπτώσεις στη λειτουργία της.",
    subFactors: [
      "Μεγάλος αριθμός τοπικών και εθνικών specialty coffee roasters",
      "Δυνατότητα απευθείας εισαγωγής / συνεργασίας (Direct Trade) με φάρμες specialty καφέ",
      "Μικρό μέγεθος μεμονωμένης παραγγελίας σε σχέση με την αγορά"
    ]
  },
  {
    id: "new-entrants",
    title: "Απειλή Νέων Εισερχομένων",
    titleEn: "Threat of New Entrants",
    scale: "ΧΑΜΗΛΗ ΠΡΟΣ ΜΕΤΡΙΑ",
    scaleColor: "bg-emerald-950/40 text-emerald-400 border-emerald-800",
    description: "Αν και το άνοιγμα μιας απλής καφετέριας είναι εύκολο, η δημιουργία ενός υβριδικού cult hub με mini skate ramp, αδειοδοτημένο γκαλερί και καθιερωμένο street brand απαιτεί σημαντικό κεφάλαιο, τεχνογνωσία και βαθιά δικτύωση με την urban κοινότητα.",
    subFactors: [
      "Υψηλό αρχικό κεφάλαιο για διαμόρφωση skate ramp και gallery αδειοδοτήσεων",
      "Ανάγκη για αυθεντική Urban κουλτούρα και credibility",
      "Καμπύλη εμπειρίας και δυσκολία εύρεσης κατάλληλου πολυώροφου ακινήτου στο κέντρο"
    ]
  },
  {
    id: "substitutes",
    title: "Απειλή Υποκατάστατων Προϊόντων",
    titleEn: "Threat of Substitutes",
    scale: "ΜΕΤΡΙΑ",
    scaleColor: "bg-amber-950/40 text-amber-400 border-amber-800",
    description: "Υποκατάστατα όπως οικιακός specialty coffee, take-away αλυσίδες, bars ή απλά πάρκα για skate αποτελούν απειλή, αλλά κανένα δεν συνδυάζει την ολοκληρωμένη premium urban εμπειρία.",
    subFactors: [
      "Take-away ready-to-drink coffee αλυσίδες (value-for-money εναλλακτικές)",
      "Δημόσια skate parks (αν και χωρίς τις ανέσεις ενός premium cafe)",
      "Παραδοσιακοί χώροι εστίασης και cocktail bars για το βραδινό κοινό"
    ]
  },
  {
    id: "industry-rivalry",
    title: "Ανταγωνισμός μεταξύ Υπαρχόντων Επιχειρήσεων",
    titleEn: "Rivalry Among Existing Competitors",
    scale: "ΜΕΤΡΙΑ",
    scaleColor: "bg-amber-950/40 text-amber-400 border-amber-800",
    description: "Ο ανταγωνισμός στην εστίαση της Θεσσαλονίκης είναι έντονος. Ωστόσο, το Thess Cult Hub δεν ανταγωνίζεται ευθέως τις κλασικές καφετέριες, αλλά δημιουργεί μια δική του κατηγορία, οπότε ο άμεσος ανταγωνισμός παραμένει ελεγχόμενος.",
    subFactors: [
      "Μεγάλος αριθμός καφετεριών στη Θεσσαλονίκη (η πόλη με τα περισσότερα καφέ ανά κάτοικο)",
      "Ύπαρξη ορισμένων concept stores με πώληση ρούχων ή διοργάνωση live (χωρίς skate χαρακτήρα)",
      "Δυνατότητα διαφοροποίησης μέσω συνεχών drops, art-exhibitions και skate contests"
    ]
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "graffiti-wall",
    title: "Τοίχος Graffiti (Live Art & Events)",
    type: "recurring",
    caption: "Ζωντανή φιλοτέχνηση τοίχων από local street artists, μετατρέποντας το καφέ σε urban landmark.",
    revenueDesc: "Live events με εισιτήριο, πώληση prints/merch καλλιτέχνη (20-30% προμήθεια), sponsorships από street brands.",
    expenseDesc: "Υλικά (σπρέι, βερνίκια προστασίας), αμοιβή εικαστικού καλλιτέχνη (εάν υπάρχει).",
    profitDesc: "Χαμηλό άμεσο κέρδος αλλά εξαιρετικά υψηλή έμμεση κερδοφορία (Instagram, foot traffic, brand credibility).",
    targetDesc: "Να γίνει το κατάστημα 'urban landmark' και σημείο αναφοράς για φωτογραφίες (δωρεάν viral διαφήμιση).",
    partnerApproach: "Προσέγγιση graffiti crews και εικαστικών της πόλης, προσφέροντάς τους δωρεάν τον τοίχο ως καμβά, κάλυψη των υλικών τους και 75% των εσόδων από prints.",
    customerApproach: "Time-lapse βίντεο στα social media, live-painting block parties με DJs και countdowns στο Instagram.",
    workflowSteps: [
      { step: 1, title: "Επιλογή Καλλιτέχνη", desc: "Curating της street αισθητικής και προετοιμασία τοίχου." },
      { step: 2, title: "Συμφωνία Χορηγίας", desc: "Εξασφάλιση σπρέι από street brands ή τοπικά χρωματοπωλεία." },
      { step: 3, title: "Guerilla Προώθηση", desc: "Κοινοποίηση teaser βίντεο και countdowns." },
      { step: 4, title: "Διεξαγωγή Live Event", desc: "Live painting με DJ set, specialty καφέδες και custom ποτά." },
      { step: 5, title: "Post-Event Buzz", desc: "Τοποθέτηση QR δίπλα στο έργο για πώληση prints & merch online." }
    ]
  },
  {
    id: "thanos-talks",
    title: "Ομιλία Θάνου (Συναντήσεις Γνώσης & Ψυχολογίας)",
    type: "recurring",
    caption: "Σεμινάρια, ομιλίες και ανοιχτές συζητήσεις γύρω από την ψυχολογία, την αυτογνωσία και τις ανθρώπινες σχέσεις.",
    revenueDesc: "Εισιτήριο εισόδου, αυξημένη κατανάλωση specialty καφέδων, ροφημάτων και τοπικού κρασιού.",
    expenseDesc: "Αμοιβή Θάνου (εισηγητή), ψηφιακή προώθηση του event.",
    profitDesc: "Μεσαίο έως υψηλό περιθώριο κέρδους (τα events έχουν εξαιρετικά χαμηλά μεταβλητά έξοδα).",
    targetDesc: "Σταθερό κοινό, positioning του χώρου ως κέντρου ψυχολογίας και γνώσης.",
    partnerApproach: "Συμφωνία με ποσοστό επί των εισιτηρίων, παρέχοντας στον Θάνο πλήρη τεχνική κάλυψη και ηχογράφηση για podcast.",
    customerApproach: "Stories με ανώνυμα Q&A κουτάκια στο Instagram όπου ο Θάνος απαντάει ζωντανά κατά τη διάρκεια του event.",
    workflowSteps: [
      { step: 1, title: "Θεματολογία", desc: "Digital polls στο Instagram για επιλογή επίκαιρου θέματος (π.χ. άγχος, σχέσεις)." },
      { step: 2, title: "Κρατήσεις", desc: "Άνοιγμα ψηφιακών θέσεων με περιορισμένο capacity για cozy ατμόσφαιρα." },
      { step: 3, title: "Ρύθμιση Χώρου", desc: "Χαμηλός, ζεστός φωτισμός και ambient μουσική υπόκρουση." },
      { step: 4, title: "Διεξαγωγή Ομιλίας", desc: "Διαδραστική ομιλία 60 λεπτών με ανοιχτό Q&A φόρουμ στο τέλος." },
      { step: 5, title: "Follow-up", desc: "Αποστολή ευχαριστήριου email με σημειώσεις και πρόσκληση για το επόμενο session." }
    ]
  },
  {
    id: "stella-activities",
    title: "Δραστηριότητες Στέλλας (Community Workshops)",
    type: "fixed",
    caption: "Συναντήσεις, book clubs, καλλιτεχνικές παρεμβάσεις και χειροποίητα projects με την καθοδήγηση της Στέλλας.",
    revenueDesc: "Εισιτήριο συμμετοχής (αναλόγως της φύσεως), κατανάλωση specialty ροφημάτων, upselling δικών μας προϊόντων.",
    expenseDesc: "Μικρό κόστος βασικών υλικών χειροτεχνίας/projects, χρόνος προετοιμασίας.",
    profitDesc: "Μεσαίο και απολύτως σταθερό κέρδος που τροφοδοτεί την καθημερινή ροή του καταστήματος.",
    targetDesc: "Δημιουργία ισχυρού community & σταθερή επαναληψιμότητα επισκεπτών.",
    partnerApproach: "Εσωτερική διοργάνωση από τη Στέλλα, link με τοπικές καλλιτεχνικές ομάδες και book reviewers.",
    customerApproach: "Πρόσκληση μέσω του newsletter της κοινότητας και personalized stories της Στέλλας που εξηγούν το concept.",
    workflowSteps: [
      { step: 1, title: "Σύλληψη Project", desc: "Σχεδιασμός του μηνιαίου θέματος (π.χ. Book Club ή DIY Linocut print)." },
      { step: 2, title: "Προέτοιμασία Υλικών", desc: "Προμήθεια πρώτων υλών σε χονδρική τιμή." },
      { step: 3, title: "Ανακοίνωση", desc: "Ανάρτηση στα social media με αισθητική lookbook." },
      { step: 4, title: "Φιλοξενία", desc: "Ζεστή φιλοξενία στο μεγάλο τραπέζι με specialty καφέ και vegan muffins." },
      { step: 5, title: "Καλλιτεχνική Γκαλερί", desc: "Έκθεση των αποτελεσμάτων του workshop σε ειδικό γωνιακό pegboard." }
    ]
  },
  {
    id: "local-partners",
    title: "Επικοινωνία με Δομές γύρω από το Μαγαζί",
    type: "fixed",
    caption: "Στρατηγική συνεργασία με πανεπιστημιακές ομάδες, σχολές γραφιστικής και τοπικούς πολιτιστικούς φορείς.",
    revenueDesc: "Ομαδικές κρατήσεις, φιλοθρησκευτικά workshops, B2B catering και αυξημένη ημερήσια κατανάλωση.",
    expenseDesc: "Μηδενικά χρηματικά έξοδα (μόνο επένδυση χρόνου για networking και επικοινωνία).",
    profitDesc: "Εξαιρετικά υψηλό margin καθώς οι ομαδικές κρατήσεις εγγυώνται μαζική και γρήγορη κατανάλωση.",
    targetDesc: "Εξασφάλιση σταθερής ροής πελατών (φοιτητές, creatives) και ισχυρή τοπική δικτύωση.",
    partnerApproach: "Προσφορά ειδικών πακέτων (εκπτώσεις σε ομαδικά groups > 8 ατόμων) και δωρεάν παραχώρηση του προβολέα για παρουσιάσεις.",
    customerApproach: "Διανομή καλαίσθητων flyers στις γραμματείες σχολών και B2B emails προς τους υπεύθυνους των δομών.",
    workflowSteps: [
      { step: 1, title: "Mapping Δομών", desc: "Καταγραφή σχολών γραφιστικής, θεατρικών ομάδων και συλλόγων του ΑΠΘ/ΠΑΜΑΚ." },
      { step: 2, title: "Προσφορά Συνεργασίας", desc: "Αποστολή πρότασης για δωρεάν φιλοξενία των συναντήσεών τους τις ήσυχες ώρες." },
      { step: 3, title: "Συντονισμός Ροής", desc: "Κράτηση του κεντρικού μοναστηριακού τραπεζιού και ρύθμιση του φωτισμού." },
      { step: 4, title: "Παροχή Φιλοξενίας", desc: "Σερβίρισμα Single Origin Espresso και σνακ με ομαδική έκπτωση." },
      { step: 5, title: "Loyalty Κλείσιμο", desc: "Ένταξη των μελών της δομής σε ειδικό digital loyalty discount σχήμα." }
    ]
  },
  {
    id: "paint-nights-adults",
    title: "Βραδιές Ζωγραφικής Ενηλίκων (Paint & Sip)",
    type: "recurring",
    caption: "Δημιουργικές βραδιές όπου οι συμμετέχοντες ζωγραφίζουν καθοδηγούμενοι, απολαμβάνοντας premium κρασί.",
    revenueDesc: "Εισιτήριο 15-25€ (καμβάς, χρώματα, πινέλα, 1 ποτήρι κρασί), upselling σε snacks και έξτρα ποτήρια κρασιού.",
    expenseDesc: "Υλικά ζωγραφικής (ακρυλικά, πινέλα, καμβάδες), αμοιβή εικαστικού εισηγητή.",
    profitDesc: "Υψηλό άμεσο περιθώριο κέρδους λόγω premium pricing και χαμηλού wholesale κόστους υλικών.",
    targetDesc: "Προσέλκυση νέου, premium κοινού (25-45 ετών) που αναζητά εναλλακτικές δημιουργικές εξόδους.",
    partnerApproach: "Συνεργασία με απόφοιτους της Σχολής Καλών Τεχνών του ΑΠΘ, προσφέροντάς τους σταθερή αμοιβή ή ποσοστό.",
    customerApproach: "Προώθηση ως 'The Perfect Creative Date Night' ή 'Alternative Team Bonding' με ειδικές τιμές για ζευγάρια.",
    workflowSteps: [
      { step: 1, title: "Sourcing Υλικών", desc: "Μαζική αγορά μικρών καμβάδων, ακρυλικών χρωμάτων, πινέλων και ποδιών." },
      { step: 2, title: "Visual Teaser", desc: "Ανάρτηση του πίνακα-οδηγού που θα ζωγραφιστεί στα social media." },
      { step: 3, title: "Setup Χώρου", desc: "Στήσιμο καβαλέτων στον κεντρικό χώρο με προστατευτικά καλύμματα." },
      { step: 4, title: "Διεξαγωγή Paint & Sip", desc: "Βήμα-βήμα καθοδήγηση με παράλληλο σερβίρισμα κρασιού και finger food." },
      { step: 5, title: "Photo Exhibition", desc: "Ομαδική αναμνηστική φωτογραφία και οι πελάτες παίρνουν το έργο τους σπίτι." }
    ]
  },
  {
    id: "paint-afternoons-kids",
    title: "Απογεύματα Ζωγραφικής για Παιδιά",
    type: "recurring",
    caption: "Δημιουργικά, ασφαλή απογεύματα ζωγραφικής και χειροτεχνίας για παιδιά, προσφέροντας παράλληλα χαλάρωση στους γονείς.",
    revenueDesc: "Εισιτήριο συμμετοχής ανά παιδί, αυξημένη κατανάλωση specialty καφέ/snack από τους γονείς που περιμένουν.",
    expenseDesc: "Αναλώσιμα υλικά (νερομπογιές, χαρτόνια, πηλός), αμοιβή παιδαγωγού/εικαστικού.",
    profitDesc: "Μεσαίο άμεσο κέρδος, αλλά εξαιρετικό για το loyalty των οικογενειών της γειτονιάς τις 'νεκρές' απογευματινές ώρες.",
    targetDesc: "Προσέλκυση οικογενειών, δημιουργία ενός σταθερού, φιλικού προς τα παιδιά (family-friendly) community.",
    partnerApproach: "Συνεργασία με νηπιαγωγούς ή φοιτητές παιδαγωγικών σχολών, παρέχοντάς τους σταθερή αμοιβή ανά 2ωρο session.",
    customerApproach: "Guerilla marketing σε τοπικά σχολεία, παιδότοπους και Facebook groups γονέων της Θεσσαλονίκης.",
    workflowSteps: [
      { step: 1, title: "Σχεδιασμός Θέματος", desc: "Επιλογή εύκολων projects (π.χ. πηλός, δακτυλομπογιές) κατάλληλων για ηλικίες 5-11." },
      { step: 2, title: "Kid-Proofing", desc: "Τοποθέτηση ειδικών πλαστικών καλυμμάτων σε τραπέζια και πατώματα." },
      { step: 3, title: "Γονικό Lounge", desc: "Διαμόρφωση ειδικής προσφοράς 'Καφέ + Cinnamon Roll' για τους γονείς." },
      { step: 4, title: "Διεξαγωγή Workshop", desc: "Δημιουργικό παιχνίδι 90 λεπτών υπό την επίβλεψη παιδαγωγού." },
      { step: 5, title: "Τοίχος των Μικρών", desc: "Κρέμασμα των έργων σε ειδικό panel και απονομή 'διπλωμάτων μικρού καλλιτέχνη'." }
    ]
  },
  {
    id: "movie-nights",
    title: "Βραδιές Κινηματογράφου (Movie Nights)",
    type: "recurring",
    caption: "Προβολές εμβληματικών indie ταινιών, skate videos, anime και ντοκιμαντέρ με cozy vibes.",
    revenueDesc: "Συμβολικό εισιτήριο, Specialty Combos (Pop-corn & Craft Beer), upselling σε snacks και ποτά.",
    expenseDesc: "Μικρό κόστος προμηθειών (popcorn), άδεια προβολής (εάν απαιτείται δημόσια εκτός ελεύθερων πηγών).",
    profitDesc: "Μεσαίο άμεσο κέρδος, αλλά engagement στα social media και ιδανικό για τις κρύες χειμερινές ημέρες.",
    targetDesc: "Ανάπτυξη εναλλακτικής 'movie-night' κουλτούρας, ενίσχυση της επαναληψιμότητας των θαμώνων.",
    partnerApproach: "Micro-sponsorships από τοπικά ζυθοποιεία (craft beers) που προσφέρουν δώρα κατά τη διάρκεια της προβολής.",
    customerApproach: "Instagram Polls για την επιλογή της ταινίας (π.χ. 'Indie Classics' vs 'Retro 90s Skate Videos').",
    workflowSteps: [
      { step: 1, title: "Επιλογή Ταινίας", desc: "Poll στα social media για τη διασφάλιση μέγιστου ενδιαφέροντος κοινού." },
      { step: 2, title: "Τεχνικός Έλεγχος", desc: "Ρύθμιση προβολέα HD, δοκιμή ήχου και στήσιμο πανιού υψηλής αντανακλαστικότητας." },
      { step: 3, title: "Cozy Setup", desc: "Τοποθέτηση bean bags, μαξιλαριών και χαμηλού cozy φωτισμού." },
      { step: 4, title: "Προβολή", desc: "Σερβίρισμα ζεστού popcorn, specialty cocktails και ροφημάτων κατά τη διάρκεια του διαλείμματος." },
      { step: 5, title: "Movie Discussion", desc: "Μικρή συζήτηση μετά την προβολή για networking και κλείσιμο με Lo-fi μουσική." }
    ]
  },
  {
    id: "art-exhibition-gallery",
    title: "Έκθεση Τέχνης & Gallery Space",
    type: "fixed",
    caption: "Μόνιμη, εναλλασσόμενη έκθεση πινάκων, prints, φωτογραφίας και street art στους τοίχους του καφέ.",
    revenueDesc: "Προμήθεια 20-40% επί των πωλήσεων των έργων, πωλήσεις specialty ποτών κατά τη βραδιά των εγκαινίων.",
    expenseDesc: "Μηδενικά χρηματικά έξοδα (ο καλλιτέχνης αναλαμβάνει το στήσιμο και κρέμασμα των έργων του).",
    profitDesc: "Καθαρό profit χωρίς ρίσκο αποθέματος, ενώ διακοσμείται ο χώρος δωρεάν με πρωτότυπα εικαστικά έργα.",
    targetDesc: "Πρεστίζ (Prestige), προσέλκυση καλλιτεχνών και σύνδεση με την εικαστική κοινότητα της πόλης.",
    partnerApproach: "Πρόσκληση ενδιαφέροντος σε νέους φωτογράφους & εικαστικούς. Παροχή δωρεάν προβολής και οργάνωση opening night.",
    customerApproach: "Κάρτες με QR δίπλα από κάθε έργο που οδηγούν σε landing page με το βιογραφικό του καλλιτέχνη και τιμή αγοράς.",
    workflowSteps: [
      { step: 1, title: "Curation & Επιλογή", desc: "Αξιολόγηση portfolios ώστε να διατηρείται μια αναγνωρίσιμη, ποιοτική αισθητική." },
      { step: 2, title: "Setup Έκθεσης", desc: "Επαγγελματική τοποθέτηση των έργων και προσαρμογή των spotlight προβολέων." },
      { step: 3, title: "Co-Marketing", desc: "Συνδυασμένη καμπάνια προώθησης από τα social media του καφέ και του καλλιτέχνη." },
      { step: 4, title: "Opening Night", desc: "Βραδιά εγκαινίων με επιλεγμένη jazz/house μουσική και δωρεάν welcome drink." },
      { step: 5, title: "Rotation", desc: "Αλλαγή έκθεσης κάθε 4-6 εβδομάδες για να παραμένει ο χώρος οπτικά φρέσκος." }
    ]
  },
  {
    id: "book-exchange-sale",
    title: "Βιβλία για Πώληση & Ανταλλαγή",
    type: "fixed",
    caption: "Cozy γωνιά με επιλεγμένα βιβλία τέχνης, design, skate, ψυχολογίας και λογοτεχνίας για ανάγνωση, πώληση ή ανταλλαγή.",
    revenueDesc: "Πώληση αυτοεκδόσεων (zines) και βιβλίων, έμμεσα έσοδα λόγω κατακόρυφης αύξησης του χρόνου παραμονής και κατανάλωσης.",
    expenseDesc: "Αγορά αρχικού μικρού stock βιβλίων, κατασκευή ξύλης βιβλιοθήκης.",
    profitDesc: "Χαμηλό άμεσο κέρδος αλλά εξαιρετικά υψηλό έμμεσο (cozy ατμόσφαιρα, αύξηση της μέσης απόδειξης λόγω παραμονής).",
    targetDesc: "Δημιουργία cozy, πνευματικού vibe και προσέλκυση ατόμων που αναζητούν έναν ήσυχο χώρο για διάβασμα/εργασία.",
    partnerApproach: "Συνεργασία με ανεξάρτητους εκδοτικούς οίκους της Θεσσαλονίκης για πώληση zines με παρακαταθήκη.",
    customerApproach: "'Book Blind Date' (τυλιγμένα βιβλία με κρυφά στοιχεία) και καθιέρωση 'Σαββατοκύριακου Ανταλλαγής Βιβλίου'.",
    workflowSteps: [
      { step: 1, title: "Curation Τίτλων", desc: "Επιλογή τίτλων που ταιριάζουν στην κουλτούρα του μαγαζιού (graphic design, street art)." },
      { step: 2, title: "Διαμόρφωση Γωνιάς", desc: "Τοποθέτηση vintage βιβλιοθήκης, άνετης πολυθρόνας και ζεστού φωτισμού διαβάσματος." },
      { step: 3, title: "Sourcing Zines", desc: "Φιλοξενία αυτοεκδόσεων από τοπικούς designers και εικαστικούς." },
      { step: 4, title: "Λειτουργία", desc: "Δανεισμός βιβλιοθήκης με την αγορά καφέ, ή απευθείας αγορά zines." },
      { step: 5, title: "Book Club Link", desc: "Φιλοξενία Book Clubs κάθε δεύτερη Τετάρτη με ειδικά tea combos." }
    ]
  },
  {
    id: "tattoo-painter-residency",
    title: "Ζωγράφος ή Tattoo Artist Residency",
    type: "fixed",
    caption: "Φιλοξενία ενός τοπικού καλλιτέχνη ή tattoo artist σε ειδικό 'pop-up booth' για live σχέδια και flash sessions.",
    revenueDesc: "Σταθερό ενοίκιο χώρου/booth, ποσοστό % επί των ραντεβού, κατανάλωση specialty καφέ από τους πελάτες του καλλιτέχνη.",
    expenseDesc: "Μηδενικά (ο καλλιτέχνης φέρνει τα δικά του αποστειρωμένα εργαλεία και υλικά).",
    profitDesc: "Υψηλό profit με μηδενικό ρίσκο, ενώ παράλληλα ενισχύεται δραματικά ο urban χαρακτήρας του καταστήματος.",
    targetDesc: "Σύνδεση με το street culture, προσέλκυση εντελώς νέου, αφοσιωμένου κοινού.",
    partnerApproach: "Προσφορά 'turn-key' booth με ρεύμα, design, τραπέζι και promotion με αντάλλαγμα 15-20% προμήθεια ή flat fee.",
    customerApproach: "Προμήθεια μέσω Instagram flash sheets (έτοιμα μικρά σχέδια tattoo σε χαμηλές τιμές) αποκλειστικά για το διήμερο.",
    workflowSteps: [
      { step: 1, title: "Curation Καλλιτέχνη", desc: "Επιλογή αναγνωρίσιμου street/tattoo artist με πιστό κοινό στη Θεσσαλονίκη." },
      { step: 2, title: "Setup Booth", desc: "Διαμόρφωση καθαρού, φωτεινού pop-up booth με τηρώντας όλους τους κανόνες υγιεινής." },
      { step: 3, title: "Digital Booking", desc: "Άνοιγμα ψηφιακών rantevou μέσω Instagram DMs." },
      { step: 4, title: "Live Flash Day", desc: "Διεξαγωγή του residency με playlist επιλεγμένη από τον καλλιτέχνη." },
      { step: 5, title: "Social Catch-up", desc: "Ανάρτηση φωτογραφιών των tattoos/σχεδίων στα social media με link του artist." }
    ]
  },
  {
    id: "lego-table",
    title: "Τραπέζι LEGO (Creative Play Area)",
    type: "fixed",
    caption: "Ένα μεγάλο, custom μοναστηριακό τραπέζι γεμάτο με χιλιάδες τουβλάκια LEGO για δημιουργική απασχόληση ενηλίκων και παιδιών.",
    revenueDesc: "Έμμεσα έσοδα μέσω κατακόρυφης αύξησης της παραμονής στο κατάστημα και της κατανάλωσης specialty καφέ & cocktails.",
    expenseDesc: "Αγορά ικανής ποσότητας LEGO bricks (χύμα με το κιλό), κόστος ειδικού ξύλινου τραπεζιού με χωρίσματα.",
    profitDesc: "Έμμεσο υψηλό κέρδος, μηδενικό μεταβλητό κόστος μετά την αρχική επένδυση, τεράστιο organic reach.",
    targetDesc: "Προσέλκυση οικογενειών τα πρωινά, και geek/creative κοινού τα απογεύματα (alternative fun spot).",
    partnerApproach: "Δεν απαιτεί εξωτερικούς συνεργάτες, καθαρά εσωτερική, χαμηλού κόστους premium υποδομή.",
    customerApproach: "Διοργάνωση 'LEGO & Craft Beer Nights' (διαγωνισμός καλύτερης κατασκευής με δώρο branded t-shirt).",
    workflowSteps: [
      { step: 1, title: "Sourcing Bricks", desc: "Αγορά wholesale Lego bricks και ειδικών βάσεων κατασκευής." },
      { step: 2, title: "Custom Τραπέζι", desc: "Κατασκευή τραπεζιού με εσωτερικά slots για σωστή κατηγοριοποίηση των χρωμάτων." },
      { step: 3, title: "Daily Sanitization", desc: "Καθημερινός ψεκασμός με ειδικό, υποαλλεργικό απολυμαντικό υγρό." },
      { step: 4, title: "Creative Sessions", desc: "Λειτουργία του τραπεζιού, ελεύθερη πρόσβαση με την αγορά οποιουδήποτε specialty προϊόντος." },
      { step: 5, title: "Weekly Showcase", desc: "Έκθεση των 3 καλύτερων κατασκευών της εβδομάδας στο κεντρικό ράφι." }
    ]
  },
  {
    id: "mini-ramp",
    title: "Διαχείριση Mini Skate Ramp (Υπόγειο)",
    type: "fixed",
    caption: "Η εσωτερική ξύλινη mini ramp στο υπόγειο που αποτελεί την αυθεντική 'καρδιά' του brand.",
    revenueDesc: "Έμμεσα έσοδα μέσω κατακόρυφης αύξησης της παραμονής στο χώρο και κατανάλωσης, χορηγίες από skate brands, διοργάνωση skate contests με εισιτήριο συμμετοχής.",
    expenseDesc: "Κόστος τακτικής συντήρησης ξύλινων επιφανειών, αγορά κεριών χτυπήματος (wax) και προστατευτικού εξοπλισμού για δανεισμό.",
    profitDesc: "Μέτριο άμεσο κέρδος, αλλά ανυπολόγιστης αξίας έμμεση κερδοφορία ( brand equity, organic social media reach, απόλυτη διαφοροποίηση).",
    targetDesc: "Η εδραίωση ως ο μοναδικός, επίσημος indoor skate-friendly προορισμός στην καρδιά της Θεσσαλονίκης.",
    partnerApproach: "Συνεργασία με local skate shops και διανομείς (π.χ. Vans Greece, Monster Energy) για co-branding της ράμπας, προσφέροντάς τους αποκλειστικά δικαιώματα διαφήμισης (banners) με αντάλλαγμα εξοπλισμό ή χρηματοδότηση των events.",
    customerApproach: "Καμπάνιες με skaters που εκτελούν εντυπωσιακά κόλπα στη ράμπα μας, προσφορά δωρεάν καφέ σε όποιον καταφέρει να βγάλει ένα συγκεκριμένο flip trick της εβδομάδας, καθιέρωση 'Girls Skate Sessions' για συμπερίληψη.",
    workflowSteps: [
      { step: 1, title: "Safety Audit", desc: "Καθημερινός έλεγχος βιδών, ξύλινων συνδέσεων και καθαρισμός της ράμπας από σκόνες." },
      { step: 2, title: "Access Control", desc: "Υπογραφή υπεύθυνης δήλωσης/ασφάλειας από κάθε αναβάτη (ψηφιακά μέσω QR)." },
      { step: 3, title: "Session Rules", desc: "Τήρηση ορίου αναβατών (max 2 στη ράμπα ταυτόχρονα) για αποφυγή ατυχημάτων." },
      { step: 4, title: "Vibe Tech", desc: "Κατάλληλος mono-industrial φωτισμός και δυναμική μουσική (skate punk/lo-fi hip-hop) στο υπόγειο." },
      { step: 5, title: "Contest Ready", desc: "Μηνιαία διοργάνωση Best Trick Sessions με δώρα-merch και live streaming." }
    ]
  },
  {
    id: "group-therapy-wellness",
    title: "Ομαδική Ψυχοθεραπεία (Wellness & Mindfulness)",
    type: "recurring",
    caption: "Ολιγομελή sessions ομαδικής ψυχοθεραπείας, mindfulness και διαλογισμού με έμπειρους ψυχολόγους.",
    revenueDesc: "Εισιτήριο συμμετοχής ανά session, ποσοστό % από τον συνεργαζόμενο ψυχολόγο, κατανάλωση specialty τσαγιού/matcha.",
    expenseDesc: "Αμοιβή ψυχολόγου (εάν δεν είναι pure profit-split), προώθηση event.",
    profitDesc: "Μεσαίο περιθώριο κέρδους με εξαιρετικά χαμηλά λειτουργικά έξοδα, ιδανικό για τις πρωινές ή ήσυχες ώρες.",
    targetDesc: "Wellness κοινότητα (Wellness community), σταθερό επαναλαμβανόμενο κοινό, positioning ως holistic hub.",
    partnerApproach: "Συνεργασία με πιστοποιημένους ψυχοθεραπευτές που αναζητούν έναν ζεστό, μη-κλινικό χώρο για τις ομάδες τους.",
    customerApproach: "'Mindful Mornings' καμπάνιες στα social media, συνδυάζοντας την ψυχική υγεία με την καθαρή, specialty διατροφή.",
    workflowSteps: [
      { step: 1, title: "Επιλογή Συνεργάτη", desc: "Συνέντευξη με ψυχολόγους που ταιριάζουν στο ανθρώπινο, ανοιχτό προφίλ του καφέ." },
      { step: 2, title: "Scheduling", desc: "Ορισμός σταθερών πρωινών ή απογευματινών ωρών εκτός ωρών αιχμής." },
      { step: 3, title: "Privacy Setup", desc: "Κλείσιμο του πίσω cozy χώρου με διαχωριστικά panels για πλήρη ιδιωτικότητα της ομάδας." },
      { step: 4, title: "Διεξαγωγή Session", desc: "Ομαδικό session 90 λεπτών με προσφορά botanical iced teas & specialty matcha." },
      { step: 5, title: "Wellness Community", desc: "Δημιουργία κλειστού chat room (Viber/WhatsApp) για ανταλλαγή σκέψεων και υλικού." }
    ]
  },
  {
    id: "own-merch",
    title: "Δικά μας Προϊόντα & Merch Drops (T-shirt, Αφίσες, Σοκολάτα)",
    type: "fixed",
    caption: "Σχεδιασμός και πώληση branded t-shirt, tote bags, posters, αυτοκόλλητων, καπέλων και custom σοκολάτας.",
    revenueDesc: "Απευθείας λιανική πώληση στο ταμείο και online, δημιουργώντας ένα εξαιρετικά κερδοφόρο retail κανάλι.",
    expenseDesc: "Κόστος παραγωγής (wholesale) και αμοιβή graphic designer για το σχεδιασμό των drops.",
    profitDesc: "Εξαιρετικά υψηλό margins (έως 60-70%) καθώς το 'Thessaloniki Street Art' brand αποκτά συλλεκτικό χαρακτήρα.",
    targetDesc: "Μετατροπή των πελατών σε 'πρεσβευτές' του brand (walking billboards) στους δρόμους της πόλης.",
    partnerApproach: "Συνεργασία με τοπικά μεταξοτυπεία (screen printing shops) για παραγωγή σε premium οργανικά βαμβακερά υφάσματα με χαμηλό ελάχιστο όριο παραγγελίας (low MOQs).",
    customerApproach: "Παρουσίαση των ρούχων σε καλαίσθητη φωτιζόμενη γωνία-βιτρίνα μέσα στο κατάστημα, τοποθέτηση αυτοκόλλητων δωρεάν σε κάθε take-away καφέ.",
    workflowSteps: [
      { step: 1, title: "Design Concept", desc: "Σχεδιασμός γραφικών που παντρεύουν το λογότυπό μας με εμβληματικά στοιχεία της Θεσσαλονίκης." },
      { step: 2, title: "Sample Verify", desc: "Δοκιμή υφασμάτων και εκτυπώσεων για διασφάλιση της κορυφαίας ποιότητας που αντέχει στο χρόνο." },
      { step: 3, title: "Lookbook Snap", desc: "Φωτογράφιση του merch με skaters/μοντέλα της κοινότητάς μας σε αστικό περιβάλλον (guerilla style)." },
      { step: 4, title: "Launch Drop", desc: "Διαθεσιμότητα των προϊόντων στο ταμείο, τοποθέτηση σε περίοπτη θέση και λανσάρισμα στα social media." },
      { step: 5, title: "Stock Watch", desc: "Παρακολούθηση αποθεμάτων μέσω του POS και σχεδιασμός του επόμενου limited drop." }
    ]
  },
  {
    id: "calligraphy-classes",
    title: "Μαθήματα Καλλιγραφίας (Workshops)",
    type: "recurring",
    caption: "Workshops εκμάθησης παραδοσιακής και μοντέρνας καλλιγραφίας, lettering και brush writing.",
    revenueDesc: "Εισιτήριο συμμετοχής (20-30€), πώληση ειδικών πενών, μελανιών και χαρτιών καλλιγραφίας, κατανάλωση ροφημάτων.",
    expenseDesc: "Υλικά (ειδικές πένες, μελάνια, τετράδια εξάσκησης), αμοιβή εισηγητή.",
    profitDesc: "Μεσαίο προς υψηλό περιθώριο κέρδους λόγω premium τιμολόγησης της εξειδικευμένης γνώσης.",
    targetDesc: "Προσέλκυση δημιουργικού, καλλιτεχνικού κοινού, ανάπτυξη κουλτούρας workshops.",
    partnerApproach: "Συνεργασία με καταξιωμένους graphic designers/lettering artists της Θεσσαλονίκης με split εσόδων (60/40).",
    customerApproach: "Προώθηση μέσω αισθητικών βίντεο γραφής (satisfying calligraphy) στο Instagram και TikTok με υψηλό virality.",
    workflowSteps: [
      { step: 1, title: "Sourcing Καλλιτέχνη", desc: "Εύρεση lettering artist με αναγνωρίσιμο στυλ και διδακτική μεταδοτικότητα." },
      { step: 2, title: "Πακέτο Υλικών", desc: "Προετοιμασία custom kit υλικών για κάθε μαθητή (πινέλα, μελάνια, οδηγοί γραφής)." },
      { step: 3, title: "Digital Teaser", desc: "Δημορίευση satisfying βίντεο γραφής στα social media για συγκέντρωση ενδιαφέροντος." },
      { step: 4, title: "Διεξαγωγή", desc: "Workshop 3 ωρών: θεωρία, πρακτική εξάσκηση και σχεδιασμός custom poster από τους μαθητές." },
      { step: 5, title: "Follow-up & Merch", desc: "Upselling σε premium μελάνια και πένες για συνέχιση της εξάσκησης στο σπίτι." }
    ]
  },
  {
    id: "photography-classes",
    title: "Μαθήματα Φωτογραφίας & Content Creation",
    type: "recurring",
    caption: "Σεμινάρια φωτογραφίας δρόμου (street photography), mobile editing και δημιουργίας περιεχομένου για social media.",
    revenueDesc: "Εισιτήριο συμμετοχής, upselling σε εκτυπώσεις (prints) των καλύτερων φωτογραφιών των μαθητών, κατανάλωση.",
    expenseDesc: "Αμοιβή εισηγητή φωτογράφου, εκτύπωση των φωτογραφιών του workshop.",
    profitDesc: "Μεσαίο κέρδος, ιδανικό για τη δημιουργία πιστού δικτύου τοπικών creators.",
    targetDesc: "Προσέλκυση creators, παραγωγή υψηλής ποιότητας έμμεσου περιεχομένου (UGC) για το καφέ.",
    partnerApproach: "Συνεργασία με τοπικούς street photographers, προσφέροντάς τους τον χώρο ως έδρα για τα πρακτικά τους μαθήματα.",
    customerApproach: "Διοργάνωση 'Street Photo Walk' στην πόλη, με αφετηρία και κατάληξη το καφέ μας για ανάλυση των λήψεων.",
    workflowSteps: [
      { step: 1, title: "Θεματολογία", desc: "Σχεδιασμός σεμιναρίων (π.χ. λήψεις με κινητό, street photography στο κέντρο της πόλης)." },
      { step: 2, title: "Photo Walk", desc: "Πρακτικό session 1 ώρας στους δρόμους γύρω από την Ερμού/Δραγούμη." },
      { step: 3, title: "Review & Edit", desc: "Επιστροφή στο καφέ, κατανάλωση ροφημάτων και feedback/editing των φωτογραφιών σε Lightroom." },
      { step: 4, title: "Mini Gallery", desc: "Εκτύπωση της καλύτερης φωτογραφίας κάθε μαθητή με laser photo-printer." },
      { step: 5, title: "Social Showcase", desc: "Ανάρτηση ομαδικού καρουζέλ στο Instagram με tags όλων των συμμετεχόντων." }
    ]
  },
  {
    id: "handmade-cups-chocolate",
    title: "Πώληση Χειροποίητων Κουπών & Premium Σοκολάτας",
    type: "fixed",
    caption: "Custom κεραμικές κούπες φτιαγμένες από τοπικούς κεραμίστες και χειροποίητες premium σοκολάτες με street-art συσκευασίες.",
    revenueDesc: "Direct retail πώληση, gift packs για δώρα, upselling κατά το σερβίρισμα specialty καφέ.",
    expenseDesc: "Κόστος αγοράς από τους προμηθευτές (κεραμίστες/custom σοκολατοποιία).",
    profitDesc: "Υψηλό περιθώριο κέρδους λόγω premium pricing και μοναδικότητας των προϊόντων.",
    targetDesc: "Αύξηση της μέσης απόδειξης (average ticket value), ενίσχυση του branded retail χαρακτήρα.",
    partnerApproach: "Συνεργασία με τοπικά εργαστήρια κεραμικής (ceramic studios) και artisan σοκολατοποιίες με custom branding.",
    customerApproach: "Σερβίρισμα του Single Origin Espresso στις custom κούπες, ώστε ο πελάτης να αγγίξει και να θέλει να τις αγοράσει.",
    workflowSteps: [
      { step: 1, title: "Co-Design", desc: "Σχεδιασμός της κούπας (με το λογότυπό μας) και των γεύσεων της σοκολάτας." },
      { step: 2, title: "Sourcing", desc: "Παραγγελία σε premium artisan εργαστήρια για διασφάλιση μοναδικότητας." },
      { step: 3, title: "Display Corner", desc: "Τοποθέτηση σε περίοπτη, φωτιζόμενη ξύλινη βιτρίνα δίπλα στο ταμείο." },
      { step: 4, title: "Sip & Feel", desc: "Χρήση των χειροποίητων κουπών στο dine-in σερβίρισμα για αλλαγή της εμπειρίας." },
      { step: 5, title: "Gift Packs", desc: "Διαμόρφωση εορταστικών/δωρητικών πακέτων (Κούπα + Σοκολάτα + 250g Specialty Beans)." }
    ]
  },
  {
    id: "art-contests",
    title: "Διαγωνισμοί Τέχνης & Δημιουργικότητας",
    type: "recurring",
    caption: "Θεματικοί διαγωνισμοί σχεδίου, ψηφιακής τέχνης ή φωτογραφίας με χρηματικά βραβεία, merch και εκθέσεις.",
    revenueDesc: "Sponsorships από τοπικά brands, αυξημένη κατανάλωση από συμμετέχοντες, πώληση των διαγωνιζόμενων έργων.",
    expenseDesc: "Βραβεία (χρηματικό έπαθλο ή δωροεπιταγές), έξοδα προώθησης και κριτικής επιτροπής.",
    profitDesc: "Μεσαίο άμεσο κέρδος αλλά τεράστια viral προβολή (User-Generated Content) και προσέλκυση ταλέντων.",
    targetDesc: "Viral περιεχόμενο στα social media, ανακάλυψη νέων καλλιτεχνών για μελλοντικές εκθέσεις.",
    partnerApproach: "Συνδιοργάνωση με σχολές γραφιστικής και street wear καταστήματα που προσφέρουν μέρος των επάθλων.",
    customerApproach: "Online ψηφοφορία κοινού μέσω Instagram Stories, αναγκάζοντας τους συμμετέχοντες να μοιραστούν το post του καφέ.",
    workflowSteps: [
      { step: 1, title: "Θεματολογία", desc: "Ανακοίνωση του θέματος (π.χ. 'Thessaloniki Underground' ή 'Skate Culture')." },
      { step: 2, title: "Submission Phase", desc: "Ψηφιακή υποβολή των έργων μέσω ειδικής φόρμας στον ιστότοπο/email." },
      { step: 3, title: "Voting & Engagement", desc: "Ανάρτηση των φιναλίστ στα social media για ψηφοφορία κοινού." },
      { step: 4, title: "Final Exhibition", desc: "Έκθεση των 20 καλύτερων έργων στους τοίχους του καφέ και ανακοίνωση νικητών." },
      { step: 5, title: "Awards Party", desc: "Closing event με Live DJ set, απονομή εράθλων και πώληση prints." }
    ]
  },
  {
    id: "clothing-popups-street",
    title: "Pop-up Ρούχα (Fashion Streetwear Drops)",
    type: "recurring",
    caption: "Φιλοξενία limited apparel drops από ανεξάρτητα ελληνικά streetwear brands, vintage συλλέκτες και illustrators.",
    revenueDesc: "Ημερήσια χρέωση ενοικίου χώρου (100-150€/ημέρα) συν προμήθεια 10% επί των πωλήσεων των ρούχων, spillover κατανάλωση καφέ/ποτών.",
    expenseDesc: "Μηδενικά (τα brands φέρνουν και στήνουν πλήρως τα δικά τους stands & καθρέφτες).",
    profitDesc: "Εξαιρετικά υψηλό margin, καθώς αξιοποιούμε κενά τετραγωνικά του φυσικού καταστήματος χωρίς Stock ρίσκο.",
    targetDesc: "Προσέλκυση Gen-Z & Millennial κοινού, διατήρηση μιας συνεχώς εναλλασσόμενης, φρέσκιας εμπειρίας.",
    partnerApproach: "Προσέγγιση designers με ενεργό ψηφιακό κοινό, προσφέροντάς τους turn-key φυσική παρουσία στο κέντρο της πόλης.",
    customerApproach: "Δημιουργία FOMO (Fear Of Missing Out) με Instagram stories 'Available ONLY for 48 Hours'.",
    workflowSteps: [
      { step: 1, title: "Curation", desc: "Επιλογή streetwear brands που ευθυγραμμίζονται απόλυτα με το skate/art vibe μας." },
      { step: 2, title: "Layout Plan", desc: "Διαμόρφωση της κεντρικής γωνίας για τοποθέτηση των stands χωρίς να εμποδίζεται η ροή." },
      { step: 3, title: "Social Buzz", desc: "Κοινά Instagram collabs posts και countdowns από τα κανάλια και των δύο πλευρών." },
      { step: 4, title: "Drop Opening", desc: "Έναρξη pop-up με DJs, specialty cocktails και παρουσία influencers της πόλης." },
      { step: 5, title: "Payout Clearance", desc: "Εκκαθάριση πωλήσεων μέσω POS και απόδοση κρατήσεων." }
    ]
  },
  {
    id: "space-rental-talks",
    title: "Ενοικίαση Χώρου για Ομιλίες & B2B Συνεργασίες",
    type: "recurring",
    caption: "Παραχώρηση/Ενοικίαση του χώρου σε εταιρείες, start-ups ή φορείς για ιδιωτικές ομιλίες, παρουσιάσεις ή team-building events.",
    revenueDesc: "Flat ενοίκιο χώρου ανά ώρα/ημέρα, υποχρεωτική ελάχιστη κατανάλωση specialty καφέ/catering ανά άτομο.",
    expenseDesc: "Μηδενικά (χρησιμοποιείται η υφιστάμενη υποδομή, με πιθανή μικρή υπερωριακή απασχόληση προσωπικού).",
    profitDesc: "Υψηλό περιθώριο κέρδους, ιδανικό για τις ώρες χαμηλής εμπορικής κίνησης (π.χ. Δευτέρα/Τρίτη πρωί-απόγευμα).",
    targetDesc: "Ανάπτυξη B2B συνεργασιών, εισροή εταιρικών πελατών με υψηλό budget.",
    partnerApproach: "Προώθηση του χώρου σε τοπικές διαφημιστικές, tech start-ups, και co-working κοινότητες ως 'Creative Gathering Venue'.",
    customerApproach: "Παρουσίαση του χώρου με επαγγελματική φωτογράφιση B2B στο LinkedIn και ειδική σελίδα 'Host Your Event'.",
    workflowSteps: [
      { step: 1, title: "Lead Generation", desc: "Στοχευμένα μηνύματα σε HR managers τοπικών εταιρειών τεχνολογίας." },
      { step: 2, title: "Event Customization", desc: "Σχεδιασμός του seating, του προβολέα και του μενού (Specialty Coffee break)." },
      { step: 3, title: "Venue Preparation", desc: "Πλήρης καθαριότητα, ρύθμιση μικροφωνικών και ηχοσυστημάτων." },
      { step: 4, title: "Host Day", desc: "Διεξαγωγή του event με runner αφοσιωμένο αποκλειστικά στην εξυπηρέτηση της εταιρείας." },
      { step: 5, title: "Billing & Feedback", desc: "Έκδοση εταιρικού τιμολογίου και αποστολή ερωτηματολογίου ικανοποίησης." }
    ]
  },
  {
    id: "book-presentations",
    title: "Παρουσιάσεις Βιβλίων & PR Events",
    type: "recurring",
    caption: "Φιλοξενία παρουσιάσεων νέων βιβλίων, κόμικς ή καλλιτεχνικών τόμων από Έλληνες νέους συγγραφείς.",
    revenueDesc: "Πώληση βιβλίων κατά το event (προμήθεια 10-20%), spillover κατανάλωση καφέ, κρασιού και σνακ.",
    expenseDesc: "Μηδενικά (ο εκδοτικός οίκος ή ο συγγραφέας αναλαμβάνει το promotion και τα έξοδα της παρουσίασης).",
    profitDesc: "Μεσαίο και ασφαλές κέρδος, ιδανικό για την ενίσχυση του πνευματικού χαρακτήρα του καταστήματος.",
    targetDesc: "Δημόσιες σχέσεις (PR), ενίσχυση της τοπικής πνευματικής και καλλιτεχνικής κοινότητας.",
    partnerApproach: "Επικοινωνία με εκδοτικούς οίκους της Θεσσαλονίκης. Παροχή του cozy χώρου μας δωρεάν με αντάλλαγμα εγγυημένο κοινό.",
    customerApproach: "Δελτία τύπου σε τοπικά free press (π.χ. Parallaxi, Biscotto) και προσκλήσεις μέσω social media.",
    workflowSteps: [
      { step: 1, title: "Αξιολόγηση", desc: "Έγκριση βιβλίου ώστε να ταιριάζει με την underground, καλλιτεχνική αισθητική μας." },
      { step: 2, title: "Booking & Timing", desc: "Κλείσιμο ημερομηνίας (συνήθως καθημερινή απόγευμα) και συντονισμός." },
      { step: 3, title: "PR Campaign", desc: "Αποστολή προσκλήσεων σε τοπικούς bloggers, δημοσιογράφους και reviewers." },
      { step: 4, title: "Book Event", desc: "Ομιλία συγγραφέα, Q&A με το κοινό, υπογραφή αντιτύπων και σερβίρισμα Single Origin καφέ." },
      { step: 5, title: "Post Promotion", desc: "Διατήρηση 2-3 υπογεγραμμένων αντιτύπων στη βιβλιοθήκη μας προς πώληση." }
    ]
  },
  {
    id: "special-art-talks",
    title: "Ομιλίες Τέχνης / Ψυχολογίας",
    type: "recurring",
    caption: "Εξειδικευμένες, ανοιχτές διαλέξεις από προσκεκλημένους ιστορικούς τέχνης, ψυχολόγους ή street-art ακτιβιστές.",
    revenueDesc: "Συμβολικό εισιτήριο, Specialty Combos (π.χ. Καφές + Slice of Homemade Pie), κατανάλωση.",
    expenseDesc: "Αμοιβή προσκεκλημένου ομιλητή, γραφιστικά promo.",
    profitDesc: "Μεσαίο περιθώριο κέρδους, αλλά εξαιρετικό για την τοποθέτηση του branding στα ακαδημαϊκά και δημιουργικά στρώματα.",
    targetDesc: "Προσέλκυση στοχευμένου, πιστού κοινού, σύσφιξη των δεσμών της κοινότητας (Community Building).",
    partnerApproach: "Πρόσκληση σε καθηγητές, bloggers ή ακτιβιστές, προσφέροντάς τους βήμα έκφρασης και κάλυψη των οδοιπορικών τους.",
    customerApproach: "Facebook events και Instagram Collabs με τον ομιλητή για άμεση πρόσβαση στο δικό του κοινό.",
    workflowSteps: [
      { step: 1, title: "Εύρεση Ομιλητή", desc: "Πρόσκληση σε ειδικούς με δυναμική παρουσία και ενδιαφέρουσα θεματολογία." },
      { step: 2, title: "Promo Graphic", desc: "Σχεδιασμός αφίσας υψηλής αισθητικής (retro-industrial στυλ) και διανομή." },
      { step: 3, title: "Setup", desc: "Διαμόρφωση καθισμάτων σε σχήμα ημικυκλίου γύρω από τον ομιλητή." },
      { step: 4, title: "The Talk", desc: "Διεξαγωγή ομιλίας 45 λεπτών με παράλληλη προβολή διαφανειών και Q&A." },
      { step: 5, title: "Recap", desc: "Βιντεοσκόπηση highlights και ανάρτηση Reels με τα κυριότερα συμπεράσματα." }
    ]
  },
  {
    id: "specialty-workshops",
    title: "Workshops & Δημιουργικά Σεμινάρια",
    type: "recurring",
    caption: "Εξειδικευμένα σεμινάρια μικρής διάρκειας (π.χ. Linocut Printing, Upcycling ρούχων, Screenprinting).",
    revenueDesc: "Εισιτήριο συμμετοχής (περιλαμβάνει όλα τα απαραίτητα υλικά και εργαλεία), upselling σε snacks και ροφήματα.",
    expenseDesc: "Υλικά workshop, αμοιβή του εξειδικευμένου εισηγητή/τεχνίτη.",
    profitDesc: "Μεσαίο προς υψηλό κέρδος λόγω της υψηλής προστιθέμενης αξίας της χειροπιαστής πρακτικής γνώσης.",
    targetDesc: "Ανάπτυξη μιας 'do-it-yourself' δραστήριας κοινότητας γύρω από το κατάστημα.",
    partnerApproach: "Συνεργασία με τοπικά δημιουργικά studios (designers, artisans) με split εσόδων 50/50.",
    customerApproach: "TikTok/Instagram Reels που δείχνουν τη διαδικασία 'Behind the Making' του workshop.",
    workflowSteps: [
      { step: 1, title: "Concept Sourcing", desc: "Επιλογή δημοφιλών DIY τάσεων (π.χ. Linocut printing σε tote bags)." },
      { step: 2, title: "Sourcing Υλικών", desc: "Προμήθεια ειδικών μελανιών, linoleum blocks, σκαρπέλων και tote bags." },
      { step: 3, title: "Promo", desc: "Reels που δείχνουν πώς μπορείς να φτιάξεις τη δική σου τσάντα σε 3 βήματα." },
      { step: 4, title: "Διεξαγωγή", desc: "Workshop 3 ωρών: σχεδιασμός, σκάλισμα, εκτύπωση και σερβίρισμα specialty καφέ." },
      { step: 5, title: "Showcase & Clean", desc: "Φωτογράφιση των custom δημιουργιών και καθαρισμός εργαστηρίου." }
    ]
  },
  {
    id: "paint-nights",
    title: "Βραδιές Ζωγραφικής Ενηλίκων (Paint & Sip)",
    type: "recurring",
    caption: "Δημιουργικά βράδια όπου οι συμμετέχοντες ζωγραφίζουν πίνοντας ποιοτικό τοπικό κρασί.",
    revenueDesc: "Εισιτήριο συμμετοχής 15-25€ (περιλαμβάνει καμβά, χρώματα, πινέλα και 1 ποτήρι κρασί), upselling σε snacks και επιπλέον ποτά.",
    expenseDesc: "Αγορά αναλώσιμων υλικών ζωγραφικής, αμοιβή εικαστικού/παιδαγωγού που καθοδηγεί το workshop.",
    profitDesc: "Υψηλό άμεσο περιθώριο κέρδους λόγω premium τιμολόγησης και χαμηλού wholesale κόστους υλικών.",
    targetDesc: "Προσέλκυση νέου, premium κοινού (ηλικίες 25-45) που αναζητά πρωτότυπες μορφές βραδινής εξόδου.",
    partnerApproach: "Συνεργασία με απόφοιτους της Σχολής Καλών Τεχνών του ΑΠΘ, προσφέροντάς τους μια σταθερή αμοιβή ανά event και την ευκαιρία να δικτυωθούν και να παρουσιάσουν τη δική τους δουλειά.",
    customerApproach: "Προώθηση ως 'The Perfect Creative Date Night' ή 'Alternative Team Bonding', προσφέροντας έκπτωση 15% για κρατήσεις ζευγαριών/παρεών.",
    workflowSteps: [
      { step: 1, title: "Material Sourcing", desc: "Μαζική αγορά μικρών καμβάδων, ακρυλικών χρωμάτων, πινέλων και ποδιών." },
      { step: 2, title: "Visual Promo", desc: "Ανάρτηση του πίνακα-οδηγού που θα ζωγραφιστεί, ώστε οι πελάτες να γνωρίζουν το concept." },
      { step: 3, title: "Easel Setup", desc: "Στήσιμο των καβαλέτων στον κεντρικό χώρο με προστατευτικά καλύμματα." },
      { step: 4, title: "Paint & Sip", desc: "Βήμα-βήμα καθοδήγηση από τον εισηγητή, με παράλληλο σερβίρισμα κρασιού και finger food." },
      { step: 5, title: "Exhibition", desc: "Ομαδική αναμνηστική φωτογραφία των έργων, ανάρτηση στα social media και οι πελάτες παίρνουν τον καμβά τους σπίτι." }
    ]
  },
  {
    id: "mini-ramp",
    title: "Διαχείριση Mini Skate Ramp (Υπόγειο)",
    type: "fixed",
    caption: "Η εσωτερική ξύλινη mini ramp στο υπόγειο που αποτελεί την αυθεντική 'καρδιά' του brand.",
    revenueDesc: "Έμμεσα έσοδα μέσω κατακόρυφης αύξησης της παραμονής στο χώρο και κατανάλωσης, χορηγίες από skate brands, διοργάνωση skate contests με εισιτήριο συμμετοχής.",
    expenseDesc: "Κόστος τακτικής συντήρησης ξύλινων επιφανειών, αγορά κεριών χτυπήματος (wax) και προστατευτικού εξοπλισμού για δανεισμό.",
    profitDesc: "Μέτριο άμεσο κέρδος, αλλά ανυπολόγιστης αξίας έμμεση κερδοφορία ( brand equity, organic social media reach, απόλυτη διαφοροποίηση).",
    targetDesc: "Η εδραίωση ως ο μοναδικός, επίσημος indoor skate-friendly προορισμός στην καρδιά της Θεσσαλονίκης.",
    partnerApproach: "Συνεργασία με local skate shops και διανομείς (π.χ. Vans Greece, Monster Energy) για co-branding της ράμπας, προσφέροντάς τους αποκλειστικά δικαιώματα διαφήμισης (banners) με αντάλλαγμα εξοπλισμό ή χρηματοδότηση των events.",
    customerApproach: "Καμπάνιες με skaters που εκτελούν εντυπωσιακά κόλπα στη ράμπα μας, προσφορά δωρεάν καφέ σε όποιον καταφέρει να βγάλει ένα συγκεκριμένο flip trick της εβδομάδας, καθιέρωση 'Girls Skate Sessions' για συμπερίληψη.",
    workflowSteps: [
      { step: 1, title: "Safety Audit", desc: "Καθημερινός έλεγχος βιδών, ξύλινων συνδέσεων και καθαρισμός της ράμπας από σκόνες." },
      { step: 2, title: "Access Control", desc: "Υπογραφή υπεύθυνης δήλωσης/ασφάλειας από κάθε αναβάτη (ψηφιακά μέσω QR)." },
      { step: 3, title: "Session Rules", desc: "Τήρηση ορίου αναβατών (max 2 στη ράμπα ταυτόχρονα) για αποφυγή ατυχημάτων." },
      { step: 4, title: "Vibe Tech", desc: "Κατάλληλος mono-industrial φωτισμός και δυναμική μουσική (skate punk/lo-fi hip-hop) στο υπόγειο." },
      { step: 5, title: "Contest Ready", desc: "Μηνιαία διοργάνωση Best Trick Sessions με δώρα-merch και live streaming." }
    ]
  },
  {
    id: "clothing-popups",
    title: "Pop-up ρούχα (Fashion & Streetwear Drops)",
    type: "recurring",
    caption: "Φιλοξενία drops από ανεξάρτητα streetwear brands, illustrators και vintage συλλέκτες.",
    revenueDesc: "Ημερήσια ενοικίαση του space (100€/ημέρα) συν προμήθεια 10% επί των πωλήσεων των ρούχων, αυξημένη κατανάλωση από το κοινό του brand.",
    expenseDesc: "Μηδενικά έξοδα (ο σχεδιαστής φέρνει και στήνει τα δικά του σταντ/κρεμάστρες).",
    profitDesc: "Εξαιρετικά υψηλό περιθώριο καθαρού κέρδους, καθώς αξιοποιείται ο υφιστάμενος χώρος χωρίς καμία επένδυση σε stock.",
    targetDesc: "Συνεχής ανανέωση του ενδιαφέροντος των επισκεπτών, προσφέροντάς τους πρόσβαση σε limited, μοναδικά προϊόντα.",
    partnerApproach: "Προσέγγιση ανερχόμενων Ελλήνων designers στα social media, αναδεικνύοντας το physical footprint του καταστήματός μας στις νεανικές ηλικίες και προσφέροντάς τους λύση 'turn-key' (χώρος, μουσική, promotion, barcode POS).",
    customerApproach: "Δημιουργία αίσθησης επείγοντος (FOMO) μέσω Instagram countdowns, τονίζοντας ότι το brand θα είναι διαθέσιμο ΜΟΝΟ για ένα Σαββατοκύριακο.",
    workflowSteps: [
      { step: 1, title: "Curation & Date", desc: "Επιλογή brand που ταιριάζει απόλυτα στην underground αισθητική μας και κλείσιμο ημερομηνίας." },
      { step: 2, title: "Display Layout", desc: "Σχεδιασμός του σημείου τοποθέτησης (κεντρική γωνία ή υπόγειο) χωρίς να παρεμποδίζεται η ροή των τραπεζιών." },
      { step: 3, title: "Joint Marketing", desc: "Συνδυασμένη καμπάνια προώθησης από τα social media του καφέ και του φιλοξενούμενου brand." },
      { step: 4, title: "Drop Day Party", desc: "Έναρξη του pop-up με ειδικά cocktail drops, special DJ sets και παρουσία influencers." },
      { step: 5, title: "Payout & Rec", desc: "Εκκαθάριση πωλήσεων μέσω του POS μας, απόδοση των χρημάτων στον δημιουργό και κρατήσεις κρατικών φόρων." }
    ]
  },
  {
    id: "exhibitions",
    title: "Έκθεση Τέχνης & Gallery Space",
    type: "fixed",
    caption: "Μόνιμη, εναλλασσόμενη έκθεση πινάκων, αφισών και φωτογραφιών στους τοίχους του καταστήματος.",
    revenueDesc: "Προμήθεια 15-40% επί των πωλήσεων των εκτιθέμενων έργων, πωλήσεις κατά τη βραδιά των εγκαινίων (opening events).",
    expenseDesc: "Μηδενικά (ο καλλιτέχνης αναλαμβάνει το στήσιμο και το κρέμασμα των έργων του υπό την επίβλεψή μας).",
    profitDesc: "Καθαρό profit χωρίς ρίσκο αποθέματος, ενώ παράλληλα διακοσμείται ο χώρος δωρεάν με υψηλής ποιότητας πρωτότυπη τέχνη.",
    targetDesc: "Σύνδεση του brand με την καλλιτεχνική ελίτ της πόλης και υποστήριξη νέων δημιουργών.",
    partnerApproach: "Πρόσκληση ενδιαφέροντος προς αποφοίτους σχολών καλών τεχνών και φωτογράφους. Παρέχουμε δωρεάν προβολή, οργάνωση opening night με δωρεάν welcome drinks, και αναλαμβάνουμε τη διαμεσολάβηση πωλήσεων.",
    customerApproach: "Τοποθέτηση καλαίσθητων μικρών πινακίδων με QR δίπλα από κάθε έργο, που οδηγεί σε landing page με το βιογραφικό του καλλιτέχνη, την τιμή και φόρμα άμεσης αγοράς.",
    workflowSteps: [
      { step: 1, title: "Artist Selection", desc: "Αξιολόγηση portfolio δημιουργών ώστε να διατηρείται ένα αναγνωρίσιμο, ποιοτικό στυλ." },
      { step: 2, title: "Vernissage Plan", desc: "Οργάνωση της βραδιάς των εγκαινίων (συνήθως Πέμπτη βράδυ) με επιλεγμένη jazz/house μουσική." },
      { step: 3, title: "Hang & Light", desc: "Επαγγελματική τοποθέτηση των έργων και προσαρμογή των spotlight φωτιστικών." },
      { step: 4, title: "The Opening", desc: "Βραδιά εγκαινίων, γνωριμία του κοινού με τον καλλιτέχνη, λήψη παραγγελιών αγοράς έργων." },
      { step: 5, title: "Rotation", desc: "Αλλαγή έκθεσης κάθε 4-6 εβδομάδες για να παραμένει ο χώρος οπτικά φρέσκος." }
    ]
  },
  {
    id: "own-merch",
    title: "Δικά μας Προϊόντα & Merch Drops",
    type: "fixed",
    caption: "Σχεδιασμός και πώληση branded t-shirt, tote bags, posters, αυτοκόλλητων, καπέλων και custom σοκολάτας.",
    revenueDesc: "Απευθείας λιανική πώληση στο ταμείο και online, δημιουργώντας ένα εξαιρετικά κερδοφόρο retail κανάλι.",
    expenseDesc: "Κόστος παραγωγής (wholesale) και αμοιβή graphic designer για το σχεδιασμό των drops.",
    profitDesc: "Εξαιρετικά υψηλό margins (έως 60-70%) καθώς το 'Thessaloniki Street Art' brand αποκτά συλλεκτικό χαρακτήρα.",
    targetDesc: "Μετατροπή των πελατών σε 'πρεσβευτές' του brand (walking billboards) στους δρόμους της πόλης.",
    partnerApproach: "Συνεργασία με τοπικά μεταξοτυπεία (screen printing shops) για παραγωγή σε premium οργανικά βαμβακερά υφάσματα με χαμηλό ελάχιστο όριο παραγγελίας (low MOQs).",
    customerApproach: "Παρουσίαση των ρούχων σε καλαίσθητη φωτιζόμενη γωνία-βιτρίνα μέσα στο κατάστημα, τοποθέτηση αυτοκόλλητων δωρεάν σε κάθε take-away καφέ.",
    workflowSteps: [
      { step: 1, title: "Design Concept", desc: "Σχεδιασμός γραφικών που παντρεύουν το λογότυπό μας με εμβληματικά στοιχεία της Θεσσαλονίκης." },
      { step: 2, title: "Sample Verify", desc: "Δοκιμή υφασμάτων και εκτυπώσεων για διασφάλιση της κορυφαίας ποιότητας που αντέχει στο χρόνο." },
      { step: 3, title: "Lookbook Snap", desc: "Φωτογράφιση του merch με skaters/μοντέλα της κοινότητάς μας σε αστικό περιβάλλον (guerilla style)." },
      { step: 4, title: "Launch Drop", desc: "Διαθεσιμότητα των προϊόντων στο ταμείο, τοποθέτηση σε περίοπτη θέση και λανσάρισμα στα social media." },
      { step: 5, title: "Stock Watch", desc: "Παρακολούθηση αποθεμάτων μέσω του POS και σχεδιασμός του επόμενου limited drop." }
    ]
  }
];

export const MARKETING_CAMPAIGNS: MarketingCategory[] = [
  {
    id: "instagram-tiktok",
    title: "Social Media (Instagram & TikTok First)",
    implementation: "Καθημερινή δημοσίευση Reels και TikToks με επίκεντρο την αυθεντικότητα. Δημιουργούμε 3 πυλώνες περιεχομένου: 1) Skate & Ramp tricks (action), 2) Behind the scenes της specialty παρασκευής καφέ (craftsmanship), 3) Artist spotlights & event teasers (culture). Αποφεύγουμε τις στημένες διαφημίσεις και επενδύουμε σε raw, hi-lo αισθητική.",
    tools: ["CapCut", "Lightroom Mobile", "Instagram Collabs Feature", "TikTok Sound Trends"],
    goals: "Δημιουργία μιας ψηφιακής κοινότητας που αλληλεπιδρά οργανικά με το brand, μετατρέποντας τους followers σε καθημερινούς πελάτες.",
    indicators: ["Engagement Rate > 8%", "+1.500 οργανικοί followers το πρώτο τρίμηνο", "User-Generated Content (UGC) tags > 50 ανά εβδομάδα"]
  },
  {
    id: "guerilla",
    title: "Guerilla Marketing & Physical Spots",
    implementation: "Στοχευμένη τοποθέτηση καλαίσθητων, branded αφισών και αυτοκόλλητων (guerilla style) σε στρατηγικά σημεία της πόλης: πανεπιστήμια (ΑΠΘ, ΠΑΜΑΚ), skate spots (Μέγαρο Μουσικής, ΔΕΘ, πάρκα), καλλιτεχνικά στέκια και σχολές γραφιστικής. Τα αυτοκόλλητα φέρουν έξυπνα quotes και custom QR κωδικούς με προσφορές.",
    tools: ["Custom Die-Cut Stickers", "Eco-friendly αφισοκόλληση", "Specific Landing Pages with UTMs"],
    goals: "Η δημιουργία συζήτησης (buzz) στους δρόμους της πόλης και η άμεση προσέλκυση του core κοινού (φοιτητές, skaters, creatives) χωρίς ακριβές διαφημίσεις.",
    indicators: ["Scan Rate QR > 15%", "Αύξηση του organic foot traffic κατά 20% τις ημέρες των drops", "Branding recognition στους δρόμους"]
  },
  {
    id: "dj-events",
    title: "DJ Sets & Opening Nights",
    implementation: "Διοργάνωση θεματικών DJs sets (Lo-fi hip-hop, vinyl-only house, synth-wave) κάθε Παρασκευή και Σάββατο βράδυ (20:00 - 24:00) για να δώσουμε ρυθμό στο κατάστημα. Χρησιμοποιούμε τοπικούς, αναγνωρίσιμους DJs και δημιουργούμε μια 'pre-drink' κουλτούρα, όπου οι πελάτες ξεκινούν τη βραδιά τους με specialty cocktails και επιλεγμένες μπύρες.",
    tools: ["Pioneer DJ Controller", "Local lineup collaborations", "Warm, ambient sound design"],
    goals: "Η αύξηση της μέσης απόδειξης (upselling) τις βραδινές ώρες και η καθιέρωση του χώρου ως ιδανικού σημείου συνάντησης πριν τη βραδινή έξοδο.",
    indicators: ["Κατανάλωση αλκοόλ/ποτών +45% κατά τη διάρκεια των sets", "Πλήρης κάλυψη του seating capacity (100% occupancy)", "Εκδήλωση ενδιαφέροντος από brands για co-hosting"]
  },
  {
    id: "collabs",
    title: "Συνεργασίες με Creators & Influencers",
    implementation: "Αποφεύγουμε τους 'κλασικούς' lifestyle influencers. Αντίθετα, κάνουμε micro-partnerships με τοπικούς skaters, illustrators, tattoo artists, video creators και φοιτητές με ισχυρή επιρροή στο μικρόκοσμό τους. Τους προσφέρουμε δωρεάν 'creator tabs' (δωρεάν καφέ/ποτά) με αντάλλαγμα αυθεντικό, αμοντάριστο UGC περιεχομένο μέσα από το χώρο μας.",
    tools: ["Barter Agreements", "Branded Creator Cards", "Exclusive Co-Created drops"],
    goals: "Η εδραίωση της αυθεντικότητας (street credibility) και η διείσδυση σε εξαιρετικά πιστά, εξειδικευμένα κοινά (niche tribes) της πόλης.",
    indicators: ["Μηδενικό χρηματικό κόστος διαφήμισης (pure barter)", "Reach > 30.000 local impressions ανά drop", "Direct referrals από followers των creators"]
  }
];

export const PEST_ANALYSIS = {
  political: "Πολιτικό Περιβάλλον: Σχετικά σταθερό φορολογικό και νομικό πλαίσιο για τις μικρομεσαίες επιχειρήσεις εστίασης στην Ελλάδα. Απαιτείται συμμόρφωση με τους υγειονομικούς κανονισμούς, τους κανόνες ηχορρύπανσης και τις ειδικές άδειες λειτουργίας για τις αθλητικές εγκαταστάσεις (mini ramp) εντός καταστημάτων υγειονομικού ενδιαφέροντος.",
  economic: "Οικονομικό Περιβάλλον: Ο πληθωρισμός επηρεάζει το κόστος των πρώτων υλών, αλλά η Θεσσαλονίκη διατηρεί ισχυρή καταναλωτική δυναμική στην εστίαση. Η τιμολογιακή μας πολιτική είναι premium αλλά προσιτή, εστιάζοντας στην παροχή value-for-experience που καθιστά τη δαπάνη ελαστική.",
  social: "Κοινωνικό Περιβάλλον: Ραγδαία άνοδος της street κουλτούρας, του skateboarding, των tattoo arts και της ανάγκης της γενιάς Gen-Z και Millennials για 'αυθεντικούς' χώρους κοινωνικοποίησης που ξεφεύγουν από τα απρόσωπα franchised καφέ.",
  technological: "Τεχνολογικό Περιβάλλον: Καθοριστική η χρήση των social media (Reels, TikTok) και των ανέπαφων ψηφιακών πληρωμών (fast-POS). Η χρήση QR codes για την πλοήγηση στο μενού, τις υπεύθυνες δηλώσεις της ράμπας και τις αγορές έργων τέχνης είναι εδραιωμένη.",
  demographic: "Δημογραφικά Στοιχεία: Η Θεσσαλονίκη είναι η μεγαλύτερη φοιτητούπολη της Ελλάδας, με πάνω από 150.000 ενεργούς φοιτητές. Η ηλικιακή ομάδα-στόχος (18-35 έτη) αποτελεί το 45% του πληθυσμού του κέντρου.",
  geographical: "Γεωγραφικό Περιβάλλον: Η διασταύρωση Ερμού & Δραγούμη αποτελεί κομβικό σημείο στην καρδιά του εμπορικού κέντρου της Θεσσαλονίκης. Αυξημένη ροή πεζών (foot traffic), άμεση πρόσβαση από πανεπιστήμια και στάσεις λεωφορείων."
};

export const INDUSTRY_ANALYSIS = {
  summary: "Ο κλάδος των καφέ-μπαρ στη Θεσσαλονίκη παρουσιάζει υψηλό κορεσμό, ωστόσο η αγορά των θεματικών multi-hubs και των αισθητικών εναλλακτικών χώρων βρίσκεται σε φάση ταχείας ανάπτυξης. Οι καταναλωτές αναζητούν την 'εμπειρία' και το 'ανήκειν' (belonging).",
  distributionChannels: "Κανάλια Διανομής: 1) Φυσικό κατάστημα (dine-in specialty coffee, events, gallery purchase), 2) Take-away/Grab-and-Go (για τη γρήγορη πρωινή ροή των εργαζομένων και φοιτητών), 3) Ψηφιακό κανάλι (e-shop για merch drops, online κρατήσεις workshops).",
  trends: "Τάσεις στον Κλάδο: Μετατόπιση προς το 'healthy lifestyle' και ταυτόχρονα την 'urban extreme sports' κουλτούρα. Premiumization στον καφέ (single origin micro-lots) και αυξανόμενη ζήτηση για custom streetwear.",
  successFactors: "Κρίσιμοι Παράγοντες Επιτυχίας: 1) Αυθεντική, μη-στημένη ταυτότητα, 2) Ποιότητα πρώτων υλών, 3) Ενεργή συμμετοχή της κοινότητας (community-driven events), 4) Στρατηγική downtown τοποθεσία, 5) Ασφάλεια και σωστή συντήρηση της skate ramp."
};

export const SWOT_ANALYSIS = {
  strengths: [
    "Μοναδικό Concept στη Θεσσαλονίκη (η μόνη καφετέρια με εσωτερική mini ramp).",
    "Downtown στρατηγική τοποθεσία (Ερμού & Δραγούμη - υψηλό foot traffic).",
    "Ισχυρή οργανική πηγή foot traffic λόγω της συνεργασίας με local street artists.",
    "Μεγάλο περιθώριο κέρδους σε specialty coffee & branded merch drops."
  ],
  weaknesses: [
    "Περιορισμένη χωρητικότητα καθήμενων (seating capacity) λόγω της mini ramp στο υπόγειο.",
    "Υψηλή εξάρτηση από την παρουσία και το προσωπικό brand των ιδρυτών (Στέλλα & Ηλίας).",
    "Αυξημένο αρχικό κόστος ηχομόνωσης και εξαερισμού του υπογείου."
  ],
  opportunities: [
    "Διοργάνωση πανελλαδικών εναλλακτικών skate & graffiti contests.",
    "Franchising ή επέκταση του brand σε άλλες φοιτητουπόλεις (π.χ. Πάτρα, Ιωάννινα).",
    "Αποκλειστικές συνεργασίες (co-branding drops) με παγκόσμια streetwear brands."
  ],
  threats: [
    "Ενδεχόμενη αυστηροποίηση των δημοτικών κανονισμών για τη λειτουργία skate ράμπας εντός εστίασης.",
    "Αύξηση του ενοικίου στο downtown ή οικονομική ύφεση που περιορίζει το discretionary spending.",
    "Αντιγραφή του concept από μεγάλους ομίλους με μεγαλύτερα κεφάλαια."
  ]
};

export const TOWS_MATRIX = {
  so: "Συνδυασμός Δυνάμεων & Ευκαιριών (SO): Αξιοποίηση της μοναδικότητας της mini-ramp και της downtown θέσης για τη διοργάνωση πανελλήνιων skate contests, προσελκύοντας μεγάλους χορηγούς (π.χ. Red Bull, Vans) και εκτοξεύοντας το foot traffic.",
  wo: "Συνδυασμός Αδυναμιών & Ευκαιριών (WO): Χρήση των dynamic pop-up events και των workshops ζωγραφικής (Paint & Sip) για την αξιοποίηση του περιορισμένου seating space τις ώρες χαμηλής κίνησης, αυξάνοντας τη μέση απόδειξη ανά πελάτη.",
  st: "Συνδυασμός Δυνάμεων & Απειλών (ST): Θωράκιση της αυθεντικότητας και του community loyalty απέναντι σε ενδεχόμενους μεγάλους αντιγραφείς - οι corporate αλυσίδες δεν μπορούν να αντιγράψουν την αληθινή underground street-credibility.",
  wt: "Συνδυασμός Αδυναμιών & Απειλών (WT): Αυστηρή τήρηση όλων των προδιαγραφών ασφαλείας, ηχομόνωσης και αδειοδότησης της ράμπας, ώστε να εκμηδενιστεί ο κίνδυνος καταγγελιών ή δημοτικών προστίμων."
};

export const STRATEGY_CHOICES = {
  growth: "Στρατηγική Ανάπτυξης: Εστίαση στη διείσδυση στην αγορά (market penetration) της Θεσσαλονίκης μέσω της διαρκούς προσέλκυσης νέων 'tribes' (π.χ. BMX αναβάτες, roller skaters, graphic designers) και αύξηση της συχνότητας επίσκεψης.",
  differentiation: "Στρατηγική Διαφοροποίησης: Απόλυτη εστίαση στην αισθητική, την street art gallery και τη mini-ramp. Δεν ανταγωνιζόμαστε στις τιμές αλλά στην εμπειρία, δικαιολογώντας το premium price point."
};

export const FUNCTIONAL_STRATEGIES = {
  marketing: "Functional Μάρκετινγκ: Organic TikTok/Reels περιεχόμενο, guerilla αυτοκόλλητα με QR, exclusive drops και email newsletters με updates των events.",
  hr: "Functional HR: Επιλογή Baristas που είναι ενεργά μέλη της τοπικής skate/art κοινότητας, εξασφαλίζοντας αυθεντική επικοινωνία με τους πελάτες. 2-στάδια αξιολόγησης και δοκιμαστικές βάρδιες.",
  finance: "Functional Finance: Διατήρηση χαμηλών αποθεμάτων (lean inventory) specialty καφέ, reinvestment των κερδών του retail merch για το επόμενο drop, αυστηρός έλεγχος των μηνιαίων παγίων.",
  operations: "Functional Operations: Self-service μοντέλο με pagers που μειώνει το κόστος προσωπικού σε 1 barista ανά βάρδια τις καθημερινές. Αυστηρός καθημερινός έλεγχος ασφαλείας της ράμπας.",
  sales: "Functional Sales: Upselling combos (καφές + muffin/cookie), direct προώθηση των εκτιθέμενων έργων τέχνης στους καθήμενους, πώληση branded αυτοκόλλητων στο ταμείο."
};

export const IMPLEMENTATION_TIMELINE = {
  march: "Μάρτιος 2026: Εύρεση & μίσθωση του ακινήτου στην Ερμού & Δραγούμη. Έναρξη αρχιτεκτονικού σχεδιασμού και έκδοση των πρώτων αδειών.",
  april: "Απρίλιος 2026: Έναρξη εργασιών ανακαίνισης, κατασκευή της mini-ramp στο υπόγειο με ειδική ξυλεία και εγκατάσταση ηχομόνωσης.",
  may: "Μάιος 2026: Ολοκλήρωση διακόσμησης (graffiti walls), εγκατάσταση επαγγελματικού εξοπλισμού espresso και δοκιμές calibration.",
  june: "Ιούνιος 2026: Συνεντεύξεις, επιλογή και εκπαίδευση baristas. Guerilla marketing καμπάνια με αυτοκόλλητα και countdown στα social media.",
  july: "Ιούλιος 2026: Μεγάλο Opening Event με live graffiti, guest DJs και skate demo. Έναρξη επίσημης λειτουργίας (07:00-24:00)."
};

export const RISK_ANALYSIS = {
  financial: "Οικονομικοί Κίνδυνοι: Υπέρβαση του αρχικού προϋπολογισμού ανακαίνισης. Μέτρα αντιμετώπισης: Λεπτομερής προσκόμιση προσφορών και διατήρηση 15% contingency reserve.",
  demand: "Κίνδυνος Μειωμένης Ζήτησης: Οι πελάτες βαριούνται το concept μετά την αρχική περιέργεια. Μέτρα: Συνεχής αλλαγή των εκθέσεων τέχνης (κάθε 5 εβδομάδες), pop-up drops και εναλλαγές DJs.",
  competition: "Ανταγωνισμός: Άνοιγμα παρόμοιου χώρου στην περιοχή. Μέτρα: Ενίσχυση του community-belonging και δημιουργία exclusive συμβολαίων με τους κορυφαίους local street artists.",
  operational: "Λειτουργικοί Κίνδυνοι (Τραυματισμοί στη Mini Ramp): Μέτρα: Υποχρεωτική υπογραφή ψηφιακής υπεύθυνης δήλωσης μέσω QR, αυστηρό όριο 2 αναβατών, παροχή δωρεάν προστατευτικού εξοπλισμού.",
  creativeServices: "Κίνδυνοι Δημιουργικών Υπηρεσιών (Ασυνέπεια Καλλιτεχνών): Μέτρα: Υπογραφή απλών, ξεκάθαρων ιδιωτικών συμφωνητικών Curation με ρήτρες παράδοσης έργων 10 ημέρες πριν το opening.",
  marketing: "Κίνδυνος Marketing: Αποτυχία προσέλκυσης του κοινού μέσω social media. Μέτρα: Barter συνεργασίες με local micro-influencers και skaters με αποδεδειγμένο engagement.",
  conclusion: "Συμπέρασμα Ανάλυσης Κινδύνων: Αν και η επιχείρηση εισάγει ένα ανατρεπτικό, υβριδικό μοντέλο, οι περισσότεροι κίνδυνοι είναι πλήρως διαχειρίσιμοι μέσω προνοητικής οργάνωσης, αυστηρών Operations και ισχυρού community focus."
};

export const HOURLY_ZONES_PRE_CALCULATIONS = {
  totalHours: 17, // 07:00 to 24:00
  targetSalesDay: 150,
  averagePrice: 4.15, // € per product with dynamic average
  sections: [
    {
      name: "Πρωί (Morning Flow)",
      hours: "07:00 - 11:00",
      duration: 4,
      percentage: 35,
      totalSales: 52,
      hourlySales: 13,
      takeAwayPercent: 80,
      sitInPercent: 20,
      takeAwayQty: 40,
      sitInQty: 12,
      staffRequired: 1,
      vibe: "Γρήγορος ρυθμός, Grab & Go, specialty espresso, πρωινά muffins. 1 πελάτης κάθε 4.6 λεπτά. Άνετη εξυπηρέτηση από 1 Barista.",
      staffDetails: "1 Barista / Ταμείο. Focus στην ταχύτητα, τη συνέπεια και το καθαρό bar."
    },
    {
      name: "Μεσημέρι (Creative Study)",
      hours: "11:00 - 17:00",
      duration: 6,
      percentage: 30,
      totalSales: 45,
      hourlySales: 7.5,
      takeAwayPercent: 60,
      sitInPercent: 40,
      takeAwayQty: 27,
      sitInQty: 18,
      staffRequired: 1,
      vibe: "Χαλαρός ρυθμός, φοιτητές με laptop, ανάγνωση βιβλίων, LEGO play, mini ramp sessions. 1 πελάτης κάθε 8 λεπτά. 1 Barista καλύπτει πλήρως.",
      staffDetails: "1 Barista / Ταμείο. Focus στη διατήρηση ήρεμης ατμόσφαιρας και upselling σνακ."
    },
    {
      name: "Απόγευμα (Community Gathering)",
      hours: "17:00 - 22:00",
      duration: 5,
      percentage: 20,
      totalSales: 30,
      hourlySales: 6,
      takeAwayPercent: 40,
      sitInPercent: 60,
      takeAwayQty: 12.5,
      sitInQty: 17.5,
      staffRequired: 1,
      vibe: "Κοινωνικό socializing, απογευματινά workshops, paint & sip έναρξη, skate tricks. 1 πελάτης κάθε 10 λεπτά.",
      staffDetails: "1 Barista / Ταμείο. Focus στην προετοιμασία των βραδινών events και τακτοποίηση τραπεζιών."
    },
    {
      name: "Βράδυ (High Intensity Lounge)",
      hours: "22:00 - 24:00",
      duration: 2,
      percentage: 15,
      totalSales: 23,
      hourlySales: 11.5,
      takeAwayPercent: 20,
      sitInPercent: 80,
      takeAwayQty: 4.5,
      sitInQty: 18.5,
      staffRequired: 2,
      vibe: "Υψηλή ένταση, DJ sets, craft μπίρες, specialty cocktails, events. 1 πελάτης κάθε 5.2 λεπτά αλλά με 80% sit-in. Απαιτείται ομάδα 2 ατόμων για άψογη ποιότητα.",
      staffDetails: "2 Άτομα: 1 Barista/Ταμείο (εκτέλεση ροφημάτων & ποτών) + 1 Runner/Support (μάζεμα ποτηριών, καθαριότητα, B2C επικοινωνία)."
    }
  ]
};

export const BARISTA_WORKFLOW = {
  morning: {
    title: "1. Πρωινό Άνοιγμα & Calibration (06:30 - 07:00)",
    steps: [
      { step: "A", title: "Υγιεινή & Έναρξη", desc: "Πλύσιμο χεριών, φόρεμα καθαρής ποδιάς και ενεργοποίηση μηχανών (espresso, πλυντήριο, φρυγανιέρες)." },
      { step: "B", title: "Calibration Μύλου", desc: "Άλεση και εκχύλισμα 2-3 δοκιμαστικών δόσεων espresso. Έλεγχος γραμμαρίων (δόση 18.5g, εκχύλιση 38g σε 26-28 δευτερόλεπτα)." },
      { step: "C", title: "Έλεγχος Γεύσης", desc: "Δοκιμή espresso για οξύτητα, σώμα, πικράδα. Αν ο καφές ρέει πολύ γρήγορα (ξινός) σφίγγουμε το μύλο, αν ρέει αργά (πικρός) ανοίγουμε." },
      { step: "D", title: "Display & Cash Register", desc: "Τοποθέτηση φρέσκων σνακ στη βιτρίνα, μέτρηση και άνοιγμα ταμείου (floating cash 50€) και έλεγχος καθαριότητας τραπεζιών εισόδου." }
    ]
  },
  busyPrep: {
    title: "2. Ροή Εργασίας σε Ώρες Αιχμής (Mise en Place)",
    steps: [
      { step: "A", title: "Σύστημα Self-Service", desc: "Ευγενική υποδοχή πελάτη, λήψη παραγγελίας, πληρωμή στο ταμείο, καταγραφή ονόματος και παράδοση pager ή φωνητική ειδοποίηση." },
      { step: "B", title: "Διατήρηση Ροής (Clean-As-You-Go)", desc: "Μετά από κάθε αφρόγαλα, σκούπισμα και εκτόνωση ακροφυσίου (purge). Καθαρισμός του κλείστρου (portafilter) με καθαρό πανί πριν από κάθε δόση." },
      { step: "C", title: "Multi-Tasking", desc: "Ένας έμπειρος barista προετοιμάζει ταυτόχρονα 2-3 ροφήματα: όσο εκχυλίζεται ο espresso, ζεστάνεται το γάλα ή ετοιμάζεται το snack." },
      { step: "D", title: "Συνεργασία & Runner Link", desc: "Στις βραδινές ώρες (22:00-24:00), ο barista επικεντρώνεται αποκλειστικά στην παραγωγή, ενώ ο Runner αναλαμβάνει το λάντζισμα, τη mini ramp και το σερβίρισμα των events." }
    ]
  },
  closing: {
    title: "3. Βραδινό Κλείσιμο & Backflushing (24:00 - 00:30)",
    steps: [
      { step: "A", title: "Καθαρισμός Μηχανής", desc: "Τυφλό φίλτρο με ειδική σκόνη καθαρισμού (Pulicaf) και backflushing των κεφαλών. Σχολαστικός καθαρισμός της σχάρας και των ντους των γκρουπ." },
      { step: "B", title: "Sanitization Μύλων", desc: "Άδειασμα των κόκκων από την καμπάνα (hopper), αποθήκευσή τους σε αεροστεγή δοχεία στο ψυγείο, και σκούπισμα του μύλου από υπολείμματα ελαίων." },
      { step: "C", title: "Clean & Restock", desc: "Λάντζα όλων των σκευών, καθαριότητα των ψυγείων, σφουγγάρισμα του χώρου και restock των αναλώσιμων (ποτήρια, καλαμάκια, γάλατα) για την επόμενη ημέρα." },
      { step: "D", title: "Ταμείο & Ασφάλεια", desc: "Έκδοση αναφοράς Ζ από το τερματικό, καταμέτρηση εισπράξεων, κλείδωμα των POS, σβήσιμο mini ramp, ενεργοποίηση συναγερμού και κλείδωμα θυρών." }
    ]
  }
};

export const STAFF_EVALUATION = {
  stages: [
    {
      title: "Στάδιο 1: Πρώτη Συνέντευξη (15-20 λεπτά)",
      focus: "Αξιολόγηση χαρακτήρα, επικοινωνιακών δεξιοτήτων και ευθυγράμμισης με το καλλιτεχνικό vibe.",
      points: ["Τρόπος ομιλίας & αυθεντικότητα", "Ευγένεια & διάθεση φιλοξενίας", "Ενδιαφέρον για τις τέχνες/skate κουλτούρα"]
    },
    {
      title: "Στάδιο 2: Δοκιμαστική Βάρδια (2-4 ώρες)",
      focus: "Πρακτική αξιολόγηση σε πραγματικές συνθήκες (στάση εργασίας, όχι απλώς τεχνική).",
      points: ["Κίνηση και αντίληψη του χώρου", "Συνεργασία υπό πίεση", "Καθαριότητα & προθυμία για πρωτοβουλίες"]
    },
    {
      title: "Στάδιο 3: Δοκιμαστική Περίοδος (1-2 εβδομάδες)",
      focus: "Πλήρης ένταξη στην ομάδα και αξιολόγηση σε βάθος χρόνου.",
      points: ["Συνέπεια & ακρίβεια ωραρίου", "Συμπεριφορά προς τακτικούς θαμώνες", "Ταχύτητα εκμάθησης & βελτίωση"]
    }
  ],
  greenIndicators: [
    "Δίνει συγκεκριμένα παραδείγματα από προηγούμενες εμπειρίες (δεν μιλά θεωρητικά).",
    "Αναλαμβάνει την ευθύνη για λάθη και δείχνει διάθεση άμεσης διόρθωσης.",
    "Μιλά με σεβασμό για πρώην εργοδότες και συναδέλφους.",
    "Παίρνει πρωτοβουλίες καθαρισμού ή τακτοποίησης όταν ο χώρος είναι άδειος."
  ],
  redFlags: [
    "Κατηγορεί ή μειώνει προηγούμενους εργοδότες/συνεργάτες.",
    "Αποφεύγει να παραδεχτεί προφανή λάθη (αμυντική στάση).",
    "Δείχνει αλαζονεία ή αδιαφορία για τον εναλλακτικό χαρακτήρα του καταστήματος.",
    "Χρήση κινητού τηλεφώνου κατά τη διάρκεια της δοκιμαστικής βάρδιας."
  ]
};

// Financial Products
export const FINANCIAL_PRODUCTS = [
  { id: "espresso", name: "Specialty Espresso (Take Away)", price: 2.20, cost: 0.35, category: "coffee" },
  { id: "espresso-in", name: "Specialty Espresso (Dine In)", price: 3.50, cost: 0.35, category: "coffee" },
  { id: "freddo-espresso", name: "Freddo Espresso (Take Away)", price: 2.60, cost: 0.40, category: "coffee" },
  { id: "freddo-espresso-in", name: "Freddo Espresso (Dine In)", price: 4.00, cost: 0.40, category: "coffee" },
  { id: "cappuccino", name: "Freddo Cappuccino (Take Away)", price: 2.90, cost: 0.55, category: "coffee" },
  { id: "cappuccino-in", name: "Freddo Cappuccino (Dine In)", price: 4.50, cost: 0.55, category: "coffee" },
  { id: "filter-micro", name: "Filter Specialty Micro-lot (Dine In)", price: 4.80, cost: 0.70, category: "coffee" },
  { id: "vegan-muffin", name: "Handmade Vegan Muffin", price: 3.20, cost: 0.80, category: "snacks" },
  { id: "cookie-double", name: "Double Choc Urban Cookie", price: 2.50, cost: 0.60, category: "snacks" },
  { id: "craft-beer", name: "Local Craft Beer (Dine In)", price: 5.50, cost: 1.80, category: "beers" },
  { id: "specialty-cocktail", name: "Custom Street-Art Cocktail", price: 8.50, cost: 2.20, category: "cocktails" }
];

// Fixed Monthly Expenses
export const FIXED_EXPENSES = [
  { id: "rent", category: "fixed", label: "Ενοίκιο DownTown Ακινήτου (Ερμού/Δραγούμη)", amount: 1500 },
  { id: "salaries", category: "fixed", label: "Μισθοδοσία 2 Baristas (Πλήρης Απασχόληση)", amount: 3200 },
  { id: "runner", category: "fixed", label: "Μισθοδοσία 1 Runner/Support (Μερική Απασχόληση)", amount: 800 },
  { id: "utilities", category: "fixed", label: "Λογαριασμοί (ΔΕΗ, Ύδρευση, Ίντερνετ, Εξαερισμός)", amount: 950 },
  { id: "accounting", category: "fixed", label: "Λογιστής & Νομική Υποστήριξη", amount: 250 },
  { id: "loan", category: "fixed", label: "Δόση Δανείου/Απόσβεση Εξοπλισμού", amount: 450 },
  { id: "marketing", category: "fixed", label: "Προμήθειες Marketing & Guerilla Υλικά", amount: 300 }
];

export const EXTRA_SERVICES_REVENUE_ESTIMATES = [
  { id: "art-sales", name: "Προμήθεια Πώλησης Έργων Τέχνης (25%)", estimate: 650 },
  { id: "workshops", name: "Workshops & Paint Nights (Paint & Sip)", estimate: 920 },
  { id: "clothing-popups", name: "Fashion Streetwear Drop Pop-up Fees", estimate: 450 },
  { id: "own-merch", name: "Branded Merch Sales (T-shirt, Tote Bags)", estimate: 1200 },
  { id: "skate-contests", name: "Skate Ramp Contests & Sponsors", estimate: 550 },
  { id: "space-rental", name: "Ιδιωτική Ενοικίαση Χώρου για Events", estimate: 400 }
];
