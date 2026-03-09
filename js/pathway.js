'use strict';

/* ============================================================
   Caerus Latin — Guided Revision Pathway
   js/pathway.js

   Storage key: ce-latin-pathway-v1
   Shape: {
     level: 'L1' | 'L2',
     currentPhase: 1–8,
     completed: [1, 2, …],
     diagnostic: { done: bool, score: int, level: 'L1'|'L2' }
   }
   ============================================================ */

// ── Diagnostic quiz data ─────────────────────────────────────
const DIAGNOSTIC = [
  {
    q: 'What case does a Latin subject take?',
    opts: ['Accusative', 'Nominative', 'Ablative', 'Dative'],
    ans: 1,
    exp: 'The subject of a Latin verb is always nominative.'
  },
  {
    q: 'Give the correct form: "the farmer walks" (agricola, present tense)',
    opts: ['agricolam ambulat', 'agricola ambulant', 'agricola ambulat', 'agricolae ambulat'],
    ans: 2,
    exp: 'agricola is nominative singular (subject). ambulat = he/she walks (3rd sg present).'
  },
  {
    q: 'What does "puellam" tell you about the noun puella?',
    opts: ['It is the subject', 'It is the direct object', 'It shows possession', 'It shows the indirect object'],
    ans: 1,
    exp: 'puellam is accusative singular — the direct object ending for 1st declension nouns.'
  },
  {
    q: 'Translate: "nautae epistulam scribunt"',
    opts: ['The sailor writes a letter', 'The sailors are writing a letter', 'The letter writes to the sailors', 'A sailor writes letters'],
    ans: 1,
    exp: 'nautae = nom. pl. (sailors, subject); scribunt = 3rd pl. present (they write); epistulam = acc. sg. (direct object).'
  },
  {
    q: 'Which is the correct imperfect tense ending for "they were carrying" (porto)?',
    opts: ['portabunt', 'portabant', 'portaverunt', 'portabat'],
    ans: 1,
    exp: 'Imperfect 3rd plural = -bant. portabant = they were carrying.'
  },
  {
    q: 'What is the genitive singular of "servus"?',
    opts: ['servo', 'servi', 'servum', 'serve'],
    ans: 1,
    exp: 'servi = of the slave (genitive singular of 2nd declension masculine nouns).'
  },
  {
    q: 'Translate: "dominus servos laudavit"',
    opts: ['The master was praising the slaves', 'The master praises the slaves', 'The master praised the slaves', 'The slaves praised the master'],
    ans: 2,
    exp: 'laudavit = perfect tense (he praised). dominus = nominative (subject); servos = accusative plural (object).'
  },
  {
    q: 'Which adjective correctly agrees with "puellam"?',
    opts: ['puella laeta', 'puellam laeta', 'puellam laetam', 'puellae laetam'],
    ans: 2,
    exp: 'Adjectives must agree in case, number, and gender. puellam is accusative singular feminine, so laetam.'
  },
  {
    q: 'What preposition takes the ablative case?',
    opts: ['ad', 'per', 'trans', 'cum'],
    ans: 3,
    exp: 'cum (with) takes the ablative. ad, per, trans all take the accusative.'
  },
  {
    q: 'Translate: "milites per vias currunt"',
    opts: ['The soldier runs through the road', 'Soldiers were running through the roads', 'The soldiers run through the roads', 'The soldiers ran through the roads'],
    ans: 2,
    exp: 'milites = nom. pl.; currunt = 3rd pl. present; per + acc.; vias = acc. pl.'
  },
  {
    q: 'Which is the correct 3rd declension nominative plural of "rex"?',
    opts: ['reces', 'reges', 'regi', 'regem'],
    ans: 1,
    exp: 'rex, regis — the nominative plural of 3rd declension nouns adds -es to the stem: reg + es = reges.'
  },
  {
    q: 'Translate: "nuntius ad regem festinavit"',
    opts: ['The messenger hurries to the king', 'The messenger hurried towards the king', 'The king hurried to the messenger', 'A messenger was hurrying for the king'],
    ans: 1,
    exp: 'festinavit = perfect (hurried); nuntius = nominative; ad + accusative; regem = acc. sg. of rex.'
  }
];

// ── Phase data ───────────────────────────────────────────────
const PHASES = [
  {
    id: 1,
    title: 'Nouns and the Present Tense',
    subtitle: '1st & 2nd declension · all four conjugations',
    intro: [
      'This is where Latin begins. Every Latin sentence has a verb — and the verb ending tells you who is doing the action.',
      'Nouns come in families called <em>declensions</em>. The 1st declension (puella type) is mostly feminine. The 2nd is mostly masculine (servus type) and neuter (bellum type).',
      'The most important thing to learn right now: the <strong>nominative</strong> is your subject; the <strong>accusative</strong> is your direct object. Get those two right and most sentences unlock.'
    ],
    activities: [
      { label: 'Review 1st & 2nd declension tables', href: 'grammar.html#nouns', icon: '🏛' },
      { label: 'Practise noun cases (flashcards)', href: 'quiz.html?mode=flashcard&filter=nouns-l1', icon: '✏️' },
      { label: 'Drill the present tense (all 4 conjugations)', href: 'grammar.html#present', icon: '🏛' }
    ],
    outputTask: {
      heading: 'Translation practice',
      instruction: 'Translate these sentences into English. Write them out — do not just read them.',
      sentences: [
        'puella in via ambulat.',
        'servi cenam parant.',
        'dominus servum vocat.',
        'nautae per undas navigant.',
        'magister librum scribit.'
      ]
    },
    unlockPool: [
      {
        q: 'What is the accusative singular of "puella"?',
        opts: ['puellae', 'puellam', 'puella', 'puellas'],
        ans: 1,
        exp: 'puellam — the accusative singular of 1st declension nouns ends in -am.'
      },
      {
        q: 'What is the nominative plural of "servus"?',
        opts: ['servi', 'servos', 'servo', 'servum'],
        ans: 0,
        exp: 'servi — the nominative plural of 2nd declension masculines ends in -i.'
      },
      {
        q: 'Translate "puellae ambulant".',
        opts: ['The girl walks', 'The girls walk', 'A girl is walking', 'The girl walked'],
        ans: 1,
        exp: 'puellae = nominative plural (the girls); ambulant = 3rd plural present (they walk).'
      },
      {
        q: 'Which ending marks the present tense 3rd person singular (he/she/it) for ALL conjugations?',
        opts: ['-nt', '-mus', '-t', '-s'],
        ans: 2,
        exp: 'The 3rd person singular present always ends in -t: amat, monet, regit, audit.'
      },
      {
        q: 'What case is "servum" in the sentence "dominus servum videt"?',
        opts: ['Nominative', 'Accusative', 'Genitive', 'Dative'],
        ans: 1,
        exp: 'servum ends in -um — accusative singular. It is the direct object (the thing being seen).'
      },
      {
        q: 'What is "bellum" in the 2nd declension?',
        opts: ['Masculine', 'Feminine', 'Neuter', '3rd declension'],
        ans: 2,
        exp: 'bellum is a 2nd declension neuter noun. Neuters always have the same nominative and accusative.'
      },
      {
        q: 'Translate "nautae insulam spectant".',
        opts: ['The sailor watches the island', 'The sailors watch the island', 'The island watches the sailors', 'A sailor watches islands'],
        ans: 1,
        exp: 'nautae = nom. pl.; insulam = acc. sg. (direct object); spectant = 3rd pl. present.'
      },
      {
        q: 'What is the 1st person plural present of "amo"?',
        opts: ['amatis', 'amas', 'amamus', 'amant'],
        ans: 2,
        exp: 'amamus — we love. The 1st person plural present ending is -mus.'
      }
    ]
  },

  {
    id: 2,
    title: 'The Full Case System',
    subtitle: 'Genitive · dative · ablative · 3rd declension intro',
    intro: [
      'Latin has six cases. You know nominative and accusative. Now for the other four.',
      'The <strong>genitive</strong> shows possession ("of the"): <em>servi</em> = of the slave. The <strong>dative</strong> is the indirect object ("to/for"): <em>servo</em> = to the slave.',
      'The <strong>ablative</strong> is the workhorse — it works with prepositions (in, cum, ab, ex) and on its own for means and manner.',
      '3rd declension nouns (rex, miles, urbs) look alarming but follow a clear pattern once you know the genitive. Learn the genitive — it gives you the stem.'
    ],
    activities: [
      { label: 'Study all six case uses', href: 'grammar.html#cases', icon: '🏛' },
      { label: 'Review 3rd declension (rex/regis type)', href: 'grammar.html#3rddecl', icon: '🏛' },
      { label: 'Noun case identification drill', href: 'quiz.html?mode=grammar&filter=cases', icon: '✏️' }
    ],
    outputTask: {
      heading: 'Case identification',
      instruction: 'For each word in bold, state: (a) the case, (b) why that case is used.',
      sentences: [
        'rex <strong>militibus</strong> pecuniam dedit.',
        '<strong>ancillae</strong> cenam parant.',
        'vir <strong>gladio</strong> pugnavit.',
        'filius <strong>patris</strong> in villa habitat.',
        'milites <strong>trans pontem</strong> cucurrerunt.'
      ]
    },
    unlockPool: [
      {
        q: 'What does the genitive case express?',
        opts: ['The direct object', 'Possession or "of"', 'The indirect object', 'Place or manner'],
        ans: 1,
        exp: 'The genitive expresses possession: servi = of the slave; regis = of the king.'
      },
      {
        q: 'What is the dative singular of "puella"?',
        opts: ['puellam', 'puellae', 'puella', 'puellis'],
        ans: 1,
        exp: 'puellae — the dative (and genitive) singular of 1st declension nouns both end in -ae.'
      },
      {
        q: 'Which case follows the preposition "cum"?',
        opts: ['Accusative', 'Genitive', 'Ablative', 'Dative'],
        ans: 2,
        exp: 'cum (with) always takes the ablative: cum servis = with the slaves.'
      },
      {
        q: 'What is the genitive singular of "rex" (3rd declension)?',
        opts: ['rex', 'regem', 'regis', 'regi'],
        ans: 2,
        exp: 'regis = of the king. The genitive gives you the stem: reg-. Learn it for every 3rd declension noun.'
      },
      {
        q: 'Translate "dona militibus dedit".',
        opts: ['He gave gifts to the soldiers', 'The soldiers gave gifts', 'He gave the soldiers\' gifts', 'Soldiers gave gifts to him'],
        ans: 0,
        exp: 'dedit = perfect (gave); dona = accusative plural (gifts, direct object); militibus = dative plural (to the soldiers).'
      },
      {
        q: 'What case is used for the indirect object?',
        opts: ['Accusative', 'Ablative', 'Genitive', 'Dative'],
        ans: 3,
        exp: 'The dative is the indirect object case: "he gave the book TO the boy" — puero (dative).'
      },
      {
        q: 'Which prepositions take the accusative? (select the odd one out)',
        opts: ['ad', 'per', 'trans', 'ex'],
        ans: 3,
        exp: 'ex takes the ablative (out of). ad, per, and trans all take the accusative.'
      },
      {
        q: 'What is the ablative plural of "miles" (3rd declension)?',
        opts: ['milites', 'militum', 'militibus', 'militi'],
        ans: 2,
        exp: 'militibus — the ablative (and dative) plural of 3rd declension nouns ends in -ibus.'
      }
    ]
  },

  {
    id: 3,
    title: 'Tenses: Imperfect and Perfect',
    subtitle: 'What was happening · what happened',
    intro: [
      'You know the present tense. Now learn the other two tenses on your Level 1 paper.',
      'The <strong>imperfect</strong> describes continuous or repeated action in the past: <em>portabat</em> = he was carrying / he kept carrying. Spot it by the -ba- before the ending.',
      'The <strong>perfect</strong> is a single completed event: <em>portavit</em> = he carried / he has carried. You need to know the principal parts — the 3rd one gives you the perfect stem.',
      'The verb <strong>esse</strong> (to be) is irregular. Learn it in all three tenses: sum/sumus (present), eram/eramus (imperfect), fui/fuimus (perfect).'
    ],
    activities: [
      { label: 'Imperfect tense table', href: 'grammar.html#imperfect', icon: '🏛' },
      { label: 'Perfect tense — principal parts', href: 'grammar.html#perfect', icon: '🏛' },
      { label: 'Tense identification drill', href: 'quiz.html?mode=grammar&filter=tenses', icon: '✏️' }
    ],
    outputTask: {
      heading: 'Parse and translate',
      instruction: 'For each verb in bold, give: (a) tense, (b) person and number, (c) meaning. Then translate the whole sentence.',
      sentences: [
        'servi in agris <strong>laborabant</strong>.',
        'dux oppidum <strong>cepit</strong>.',
        'puellae in via <strong>cantabant</strong>.',
        'milites Romam <strong>venerunt</strong>.',
        'magister librum <strong>scripsit</strong>.'
      ]
    },
    unlockPool: [
      {
        q: 'How do you recognise the imperfect tense?',
        opts: ['It ends in -erunt', 'It has -ba- before the personal ending', 'It begins with the perfect stem', 'It uses the infinitive + esse'],
        ans: 1,
        exp: 'The imperfect is formed with -ba- + ending: amabam, amabas, amabat, etc.'
      },
      {
        q: 'Translate "servi in villa laborabant".',
        opts: ['The slaves worked in the villa', 'The slaves were working in the villa', 'The slaves will work in the villa', 'The slave works in the villa'],
        ans: 1,
        exp: 'laborabant = imperfect 3rd plural = they were working (continuous past action).'
      },
      {
        q: 'What is the perfect 3rd person plural ending?',
        opts: ['-erunt', '-bant', '-unt', '-erat'],
        ans: 0,
        exp: '-erunt marks the perfect 3rd plural: amaverunt = they loved/have loved.'
      },
      {
        q: 'The perfect stem of "porto" is "portav-". What is "portaverunt"?',
        opts: ['They were carrying (imperfect)', 'They carry (present)', 'They carried (perfect)', 'They will carry (future)'],
        ans: 2,
        exp: 'portav- + erunt = portaverunt = they carried / they have carried (perfect, 3rd plural).'
      },
      {
        q: 'What is the imperfect of "sum" (1st person singular)?',
        opts: ['sum', 'ero', 'eram', 'fui'],
        ans: 2,
        exp: 'eram = I was. The imperfect of esse: eram, eras, erat, eramus, eratis, erant.'
      },
      {
        q: 'Translate "dux milites duxit".',
        opts: ['The leader was leading the soldiers', 'The leader leads the soldiers', 'The leader led the soldiers', 'The soldiers led the leader'],
        ans: 2,
        exp: 'duxit = perfect 3rd singular of duco (I lead) = he led. dux = nominative; milites = accusative plural.'
      },
      {
        q: 'Which sentence uses the imperfect correctly?',
        opts: [
          'puella clamavit (the girl was shouting)',
          'servi laborabant (the slaves were working)',
          'nauta navigavit (the sailor was sailing)',
          'magister scripsit (the teacher was writing)'
        ],
        ans: 1,
        exp: 'Only laborabant has the -ba- imperfect marker. The others are perfect tense forms.'
      },
      {
        q: 'What does the perfect tense in Latin convey?',
        opts: ['An ongoing past action', 'A completed past action', 'A future action', 'A habitual action'],
        ans: 1,
        exp: 'The perfect describes a single completed event: "he carried", "he has carried".'
      }
    ]
  },

  {
    id: 4,
    title: 'Adjective Agreement',
    subtitle: 'bonus/bona/bonum · miser · pulcher · case agreement',
    intro: [
      'A Latin adjective must agree with its noun in <strong>case, number, and gender</strong>. That is the rule. No exceptions.',
      'The standard type is <em>bonus, bona, bonum</em> (2nd-1st-2nd declension). Then there is <em>miser, misera, miserum</em> (keeps the -e-) and <em>pulcher, pulchra, pulchrum</em> (drops the -e-).',
      'The adjective does not have to be next to its noun — Latin word order is flexible. Look for the ending that matches, wherever it sits in the sentence.',
      'Watch out: a masculine noun can be 1st declension (nauta, agricola). The adjective still goes 2nd declension masculine to agree in gender.'
    ],
    activities: [
      { label: 'Adjective declension tables', href: 'grammar.html#adjectives', icon: '🏛' },
      { label: 'Adjective agreement drill', href: 'quiz.html?mode=grammar&filter=adjectives', icon: '✏️' },
      { label: 'Vocabulary: Level 1 adjectives', href: 'vocabulary.html?filter=adj-l1', icon: '📖' }
    ],
    outputTask: {
      heading: 'Agreement practice',
      instruction: 'Supply the correct form of the adjective in brackets to agree with the underlined noun.',
      sentences: [
        '<u>puellam</u> [bonus] vidit.',
        'servi <u>domini</u> [malus] fugerunt.',
        '<u>milites</u> [fortis] pugnaverunt.',
        'rex <u>nuntio</u> [laetus] respondit.',
        'in <u>villa</u> [magnus] habitabant.'
      ]
    },
    unlockPool: [
      {
        q: 'An adjective must agree with its noun in which three things?',
        opts: ['Gender, case, tense', 'Case, number, gender', 'Number, tense, gender', 'Case, conjugation, gender'],
        ans: 1,
        exp: 'Adjectives agree in case, number, and gender with the noun they describe. Always all three.'
      },
      {
        q: 'What is the correct form of "bonus" to agree with "puellam"?',
        opts: ['bonus', 'bonum', 'bona', 'bonam'],
        ans: 3,
        exp: 'puellam = accusative singular feminine. bonus must be accusative singular feminine = bonam.'
      },
      {
        q: 'Which correctly declines "miser" for a 2nd decl. masculine noun in the nominative plural?',
        opts: ['misra', 'miseri', 'misere', 'miseros'],
        ans: 1,
        exp: 'miser keeps its -e-: miseri (nom. pl. masculine). Compare: pulcher loses the -e-: pulchri.'
      },
      {
        q: 'Translate "milites fessi in castris manebant".',
        opts: ['Tired soldiers remained in the camp', 'The tired soldiers were staying in the camp', 'The soldiers were tired and stayed in camp', 'Tired soldiers had remained in the camp'],
        ans: 1,
        exp: 'fessi = nominative plural, agreeing with milites. manebant = imperfect (were staying). in castris = ablative.'
      },
      {
        q: 'What is the accusative singular masculine of "pulcher"?',
        opts: ['pulchrum', 'pulchros', 'pulchra', 'pulchram'],
        ans: 0,
        exp: 'pulchrum — pulcher drops the -e- in all forms except nom. sg. masc.: pulchr- + um = pulchrum.'
      },
      {
        q: '"agricola" is 1st declension but which gender?',
        opts: ['Feminine', 'Neuter', 'Masculine', 'It depends on context'],
        ans: 2,
        exp: 'agricola is masculine. Most 1st declension nouns are feminine, but nauta, agricola, poeta, incola are masculine. Their adjectives use 2nd declension masculine forms.'
      },
      {
        q: 'Choose the correct adjective: "in villa ___ habitabant" (the big villa)',
        opts: ['magna', 'magnus', 'magnum', 'magni'],
        ans: 0,
        exp: 'in + ablative: villa is ablative singular feminine. The adjective must be ablative singular feminine = magna.'
      },
      {
        q: 'Translate "rex iratus nuntium audivit".',
        opts: ['The king was angry and heard the messenger', 'The angry king heard the messenger', 'The king heard the angry messenger', 'An angry king was hearing the messenger'],
        ans: 1,
        exp: 'iratus is nominative singular masculine — it agrees with rex (subject). nuntium = accusative (object). audivit = perfect.'
      }
    ]
  },

  {
    id: 5,
    title: 'Pronouns and Prepositions',
    subtitle: 'ego · tu · nos · vos · prepositions with cases',
    intro: [
      'Personal pronouns in Latin: <em>ego</em> (I), <em>tu</em> (you sg.), <em>nos</em> (we), <em>vos</em> (you pl.).',
      'Because Latin verb endings already show person, pronouns are used mainly for <strong>emphasis</strong> or <strong>contrast</strong>: <em>ego ambulo, tu manes</em> — I am walking, YOU are staying.',
      'Prepositions: remember the key split. <strong>Accusative</strong>: ad (to), per (through), trans (across), contra (against), prope (near). <strong>Ablative</strong>: a/ab (from/by), cum (with), de (down from/about), e/ex (out of), in (in/on). And <em>in</em> + accusative means motion into.',
      'This is a straight memory job. Make a table and learn it. There are no shortcuts.'
    ],
    activities: [
      { label: 'Personal pronouns table', href: 'grammar.html#pronouns', icon: '🏛' },
      { label: 'Prepositions reference — accusative vs ablative', href: 'grammar.html#prepositions', icon: '🏛' },
      { label: 'Preposition drill', href: 'quiz.html?mode=grammar&filter=prepositions', icon: '✏️' }
    ],
    outputTask: {
      heading: 'Pronouns and prepositions',
      instruction: 'Translate these sentences, paying close attention to the pronoun or preposition in each.',
      sentences: [
        'ego in villa manebam, tu per agros ambulabas.',
        'milites contra hostes pugnaverunt.',
        'nos ad oppidum festinavimus.',
        'servi a domino fugerunt.',
        'vos in templum intravistis.'
      ]
    },
    unlockPool: [
      {
        q: 'What case does the preposition "per" take?',
        opts: ['Ablative', 'Dative', 'Accusative', 'Genitive'],
        ans: 2,
        exp: 'per (through) takes the accusative: per vias = through the streets.'
      },
      {
        q: 'What is the accusative of "ego"?',
        opts: ['meus', 'mihi', 'me', 'mei'],
        ans: 2,
        exp: 'me — the accusative of ego (I). "puella me vidit" = the girl saw me.'
      },
      {
        q: '"in" + accusative means what?',
        opts: ['In / on (position)', 'Into / onto (motion)', 'Out of', 'Against'],
        ans: 1,
        exp: 'in + accusative expresses motion towards/into: in villam = into the villa. in + ablative = in/on (position).'
      },
      {
        q: 'Translate "milites a castris discesserunt".',
        opts: ['The soldiers went into the camp', 'The soldiers left from the camp', 'The soldiers fought near the camp', 'Soldiers were leaving the camp'],
        ans: 1,
        exp: 'a + ablative = away from. discesserunt = perfect plural (they departed). castris = ablative.'
      },
      {
        q: 'Which pronoun is used for emphasis in "EGO hoc feci, non tu"?',
        opts: ['A personal pronoun for subject', 'A reflexive pronoun', 'A relative pronoun', 'A demonstrative pronoun'],
        ans: 0,
        exp: 'Latin verb endings already show person. Using ego (or tu) adds emphasis: I did this, not you.'
      },
      {
        q: 'What is the Latin for "with us"?',
        opts: ['a nobis', 'cum nos', 'cum nobis', 'nobis'],
        ans: 2,
        exp: 'cum + ablative: cum nobis. Note: cum is placed AFTER pronouns (nobiscum, tecum, secum) but before nouns.'
      },
      {
        q: 'Which preposition means "near" and takes the accusative?',
        opts: ['apud', 'sub', 'prope', 'sine'],
        ans: 2,
        exp: 'prope + accusative = near: prope oppidum = near the town. (sub and sine are ablative; apud is accusative but means "among/at the house of")'
      },
      {
        q: 'Translate "vos in Graeciam navigavistis".',
        opts: ['You (pl.) sailed to Greece', 'You (pl.) were sailing in Greece', 'You (pl.) sailed into Greece', 'They sailed to Greece'],
        ans: 2,
        exp: 'in + accusative (Graeciam) = motion into. vos = you plural. navigavistis = perfect 2nd plural.'
      }
    ]
  },

  {
    id: 6,
    title: 'Level 1 Consolidation',
    subtitle: 'Full translation practice · Q2 simulation',
    intro: [
      'This is your final phase before the exam. Everything you have learned comes together here.',
      'The Level 1 paper has two passages. Q1 is a comprehension — you read a glossed passage and answer questions in English. Q2 is a translation — you render the whole passage into English.',
      'For Q2, work through systematically: <strong>find the verb first</strong>, then identify the subject (nominative), then the object (accusative), then any other cases.',
      'You have 45 minutes total. Spend about 10 on Q1, 25 on Q2, and 10 checking. Do not leave blanks — an attempt at Q2 scores better than nothing.'
    ],
    activities: [
      { label: 'Practice papers — Level 1', href: 'practice-papers.html?level=1', icon: '⚡' },
      { label: 'Past papers and mark schemes', href: 'papers.html', icon: '📜' },
      { label: 'Full vocabulary review — Level 1', href: 'vocabulary.html?filter=level1', icon: '📖' }
    ],
    outputTask: {
      heading: 'Q2 simulation',
      instruction: 'Translate the following passage into English (Level 1 standard, ~50 words). Write full sentences.',
      sentences: [
        'Romulus et Remus in Italia habitabant. olim Romulus in monte stabat et muros aedificabat.',
        'subito Remus ad fratrem venit et muros superavit. Romulus erat iratus et Remum necavit.',
        'postea Romulus solus erat et tristis. Roma tamen magna et clara mox erat.'
      ]
    },
    unlockPool: [
      {
        q: 'In a CE Level 1 Q2 translation, what should you identify first in each sentence?',
        opts: ['The subject', 'The verb', 'The object', 'Any prepositions'],
        ans: 1,
        exp: 'Find the verb first — it anchors the sentence. The ending tells you person, number, and tense before you even touch the nouns.'
      },
      {
        q: 'Translate "Romani Graecos superaverunt".',
        opts: ['The Romans were overcoming the Greeks', 'The Greeks overcame the Romans', 'The Romans overcame the Greeks', 'Romans overcome Greeks'],
        ans: 2,
        exp: 'Romani = nominative plural (subject); Graecos = accusative plural (object); superaverunt = perfect (overcame).'
      },
      {
        q: 'What does "olim" mean?',
        opts: ['Often', 'Immediately', 'Once upon a time / one day', 'Finally'],
        ans: 2,
        exp: 'olim = once upon a time / one day. It signals the narrative beginning of a story. Very common in CE passages.'
      },
      {
        q: 'Translate "pueri per agros currebant quod lupum timebant".',
        opts: [
          'The boys ran through the fields because they feared a wolf',
          'The boys were running through the fields because they feared a wolf',
          'Boys ran through fields and feared wolves',
          'The boy was running through the field because he feared wolves'
        ],
        ans: 1,
        exp: 'currebant = imperfect (were running — ongoing action); timebant = imperfect; quod = because; per + acc.; agros = acc. pl.'
      },
      {
        q: 'In Q1 (comprehension), are you required to answer in full sentences?',
        opts: ['Yes, always', 'No, complete sentences are not required', 'Only for marks over 2', 'Only if the question asks "describe"'],
        ans: 1,
        exp: 'CE Level 1 comprehension answers do not need to be in complete sentences. Focus on giving the correct information.'
      },
      {
        q: 'Translate "regina nuntium ad regem misit".',
        opts: ['The queen sent a messenger to the king', 'The king sent a messenger to the queen', 'The queen was sending the king a message', 'A queen sent messages to kings'],
        ans: 0,
        exp: 'regina = nominative (queen, subject); nuntium = accusative (messenger, object); ad regem = to the king; misit = perfect (sent).'
      },
      {
        q: 'How long is the CE Level 1 Latin paper?',
        opts: ['30 minutes', '45 minutes', '60 minutes', '1 hour 30 minutes'],
        ans: 1,
        exp: '45 minutes for Level 1. Q1 (15 marks) + Q2 (30 marks) = 45 marks total.'
      },
      {
        q: 'Translate "postquam milites discesserunt, rex laetus erat".',
        opts: [
          'After the soldiers left, the king was happy',
          'Before the soldiers left, the king was happy',
          'The soldiers left because the king was happy',
          'After the soldiers left, the king had been happy'
        ],
        ans: 0,
        exp: 'postquam = after (conjunction); discesserunt = perfect (left); rex laetus erat = the king was happy (imperfect of esse).'
      }
    ]
  }
];

// ── Coming soon phases ───────────────────────────────────────
const PHASES_COMING = [
  { id: 7, title: 'Level 2: 3rd Declension & New Tenses', subtitle: 'Coming soon' },
  { id: 8, title: 'Level 2: Consolidation & Exam Technique', subtitle: 'Coming soon' }
];

// ── localStorage helpers ──────────────────────────────────────
const STORAGE_KEY = 'ce-latin-pathway-v1';

function loadProgress() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

// ── Utility ───────────────────────────────────────────────────
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function pickN(arr, n) {
  return shuffle(arr).slice(0, n);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── App state ─────────────────────────────────────────────────
var State = {
  progress: null,    // loaded from localStorage
  view: 'loading',   // loading | diagnostic | pathway | unlock
  diagAnswers: [],
  unlockQuestions: [],
  unlockPhaseId: null,
  unlockAnswers: []
};

// ── Main entry point ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  var progress = loadProgress();
  State.progress = progress;

  if (!progress || !progress.diagnostic || !progress.diagnostic.done) {
    renderLevelSelect();
  } else {
    renderPathway();
  }
});

// ── Level select screen ───────────────────────────────────────
function renderLevelSelect() {
  State.view = 'level-select';
  var app = document.getElementById('pathway-app');
  app.innerHTML = [
    '<div class="pw-screen pw-level-select">',
    '  <div class="pw-card pw-intro-card">',
    '    <div class="pw-card-ornament"></div>',
    '    <h2 class="pw-heading">Your Guided Revision Pathway</h2>',
    '    <p class="pw-lead">This pathway takes you through CE Latin step by step — from basic nouns and the present tense all the way to full Level 1 translation.</p>',
    '    <p>Before we begin, let\'s set your starting level. Answer the short diagnostic quiz (12 questions) and we\'ll suggest the right phase, or choose for yourself.</p>',
    '    <div class="pw-level-choices">',
    '      <button class="pw-btn pw-btn-primary" id="btn-start-diag">Take the diagnostic quiz</button>',
    '      <div class="pw-or">or start directly at</div>',
    '      <div class="pw-direct-starts">',
    '        <button class="pw-btn pw-btn-ghost" data-level="L1" data-phase="1">Level 1 &mdash; Phase 1 (nouns &amp; present tense)</button>',
    '        <button class="pw-btn pw-btn-ghost" data-level="L1" data-phase="3">Level 1 &mdash; Phase 3 (tenses)</button>',
    '        <button class="pw-btn pw-btn-ghost" data-level="L1" data-phase="5">Level 1 &mdash; Phase 5 (pronouns &amp; prepositions)</button>',
    '      </div>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.getElementById('btn-start-diag').addEventListener('click', function () {
    startDiagnostic();
  });

  app.querySelectorAll('[data-phase]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var phase = parseInt(btn.dataset.phase, 10);
      var level = btn.dataset.level || 'L1';
      var progress = {
        level: level,
        currentPhase: phase,
        completed: buildCompleted(phase),
        diagnostic: { done: true, score: null, level: level }
      };
      State.progress = progress;
      saveProgress(progress);
      renderPathway();
    });
  });
}

function buildCompleted(upToPhase) {
  var arr = [];
  for (var i = 1; i < upToPhase; i++) arr.push(i);
  return arr;
}

// ── Diagnostic ────────────────────────────────────────────────
function startDiagnostic() {
  State.view = 'diagnostic';
  State.diagAnswers = [];
  renderDiagQuestion(0);
}

function renderDiagQuestion(idx) {
  var q = DIAGNOSTIC[idx];
  var app = document.getElementById('pathway-app');
  var total = DIAGNOSTIC.length;
  var pct = Math.round((idx / total) * 100);

  app.innerHTML = [
    '<div class="pw-screen pw-diagnostic">',
    '  <div class="pw-diag-header">',
    '    <span class="pw-diag-label">Diagnostic &mdash; question ' + (idx + 1) + ' of ' + total + '</span>',
    '    <div class="pw-diag-bar-wrap"><div class="pw-diag-bar-fill" style="width:' + pct + '%"></div></div>',
    '  </div>',
    '  <div class="pw-card pw-question-card">',
    '    <p class="pw-question-text">' + escHtml(q.q) + '</p>',
    '    <div class="pw-options" id="diag-opts">',
    q.opts.map(function (opt, i) {
      return '<button class="pw-option" data-idx="' + i + '">' + escHtml(opt) + '</button>';
    }).join('\n'),
    '    </div>',
    '    <div class="pw-feedback" id="diag-feedback" style="display:none"></div>',
    '    <button class="pw-btn pw-btn-primary pw-next-btn" id="diag-next" style="display:none">',
    (idx + 1 < total ? 'Next question' : 'See results'),
    '    </button>',
    '  </div>',
    '</div>'
  ].join('\n');

  var answered = false;
  app.querySelectorAll('.pw-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (answered) return;
      answered = true;
      var chosen = parseInt(btn.dataset.idx, 10);
      var correct = chosen === q.ans;
      State.diagAnswers[idx] = correct ? 1 : 0;

      app.querySelectorAll('.pw-option').forEach(function (b) {
        b.disabled = true;
        if (parseInt(b.dataset.idx, 10) === q.ans) b.classList.add('pw-option--correct');
      });
      if (!correct) btn.classList.add('pw-option--wrong');

      var fb = document.getElementById('diag-feedback');
      fb.style.display = 'block';
      fb.className = 'pw-feedback ' + (correct ? 'pw-feedback--correct' : 'pw-feedback--wrong');
      fb.innerHTML = (correct ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') + escHtml(q.exp);

      document.getElementById('diag-next').style.display = 'inline-block';
    });
  });

  document.getElementById('diag-next').addEventListener('click', function () {
    if (idx + 1 < total) {
      renderDiagQuestion(idx + 1);
    } else {
      showDiagResults();
    }
  });
}

function showDiagResults() {
  var score = State.diagAnswers.reduce(function (a, b) { return a + b; }, 0);
  var total = DIAGNOSTIC.length;

  // Route: 0–5 = Phase 1, 6–8 = Phase 3, 9–12 = Phase 5 (or level 2)
  var suggestedPhase, level;
  if (score <= 5) {
    suggestedPhase = 1; level = 'L1';
  } else if (score <= 8) {
    suggestedPhase = 3; level = 'L1';
  } else {
    suggestedPhase = 5; level = 'L1';
  }

  var app = document.getElementById('pathway-app');
  app.innerHTML = [
    '<div class="pw-screen pw-diag-results">',
    '  <div class="pw-card pw-results-card">',
    '    <div class="pw-results-score">',
    '      <span class="pw-score-num">' + score + '</span>',
    '      <span class="pw-score-denom">/ ' + total + '</span>',
    '    </div>',
    '    <h2 class="pw-heading">Diagnostic complete</h2>',
    '    <p class="pw-results-summary">' + getDiagComment(score, total) + '</p>',
    '    <div class="pw-results-recommendation">',
    '      <div class="pw-rec-label">Recommended starting point</div>',
    '      <div class="pw-rec-phase">Phase ' + suggestedPhase + ' &mdash; ' + PHASES[suggestedPhase - 1].title + '</div>',
    '    </div>',
    '    <div class="pw-results-actions">',
    '      <button class="pw-btn pw-btn-primary" id="btn-accept-rec" data-phase="' + suggestedPhase + '" data-level="' + level + '">',
    '        Start at Phase ' + suggestedPhase,
    '      </button>',
    '      <button class="pw-btn pw-btn-ghost" id="btn-start-p1">Start from the beginning (Phase 1)</button>',
    '    </div>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.getElementById('btn-accept-rec').addEventListener('click', function () {
    initPathway(suggestedPhase, level);
  });
  document.getElementById('btn-start-p1').addEventListener('click', function () {
    initPathway(1, 'L1');
  });
}

function getDiagComment(score, total) {
  if (score <= 4) return 'Good start. Let\'s build the foundations properly from Phase 1 — nouns and the present tense. Get these right and everything else follows.';
  if (score <= 7) return 'Solid on the basics. A few gaps in the tenses and case system. Phase 3 is the right place to sharpen those up.';
  if (score <= 9) return 'Good work. You have most of Level 1 in hand. Phase 5 will fill any remaining gaps before the consolidation phase.';
  return 'Very strong. You are ready for the consolidation phase. Jump straight to Phase 5 or 6.';
}

function initPathway(phase, level) {
  var score = State.diagAnswers.reduce(function (a, b) { return a + b; }, 0);
  var progress = {
    level: level,
    currentPhase: phase,
    completed: buildCompleted(phase),
    diagnostic: { done: true, score: score, level: level }
  };
  State.progress = progress;
  saveProgress(progress);
  renderPathway();
}

// ── Pathway view ──────────────────────────────────────────────
function renderPathway() {
  State.view = 'pathway';
  var progress = State.progress;
  var currentPhaseId = progress.currentPhase;
  var completed = progress.completed || [];
  var allPhases = PHASES.concat(PHASES_COMING);
  var currentPhase = PHASES.find(function (p) { return p.id === currentPhaseId; });

  var app = document.getElementById('pathway-app');

  // Build phase strip
  var stripHtml = allPhases.map(function (p) {
    var isDone = completed.indexOf(p.id) !== -1;
    var isCurrent = p.id === currentPhaseId;
    var isComingSoon = !!(p.subtitle && p.subtitle === 'Coming soon');
    var cls = 'pw-phase-dot';
    if (isDone) cls += ' pw-phase-dot--done';
    else if (isCurrent) cls += ' pw-phase-dot--current';
    else cls += ' pw-phase-dot--locked';
    var label = isDone ? '&#10003;' : String(p.id);
    var title = p.title + (isComingSoon ? ' (coming soon)' : '');
    return '<button class="' + cls + '" title="' + escHtml(title) + '" aria-label="Phase ' + p.id + ': ' + escHtml(title) + '"' +
      (isDone || isCurrent ? ' data-goto="' + p.id + '"' : ' disabled') +
      '>' + label + '</button>';
  }).join('');

  // Build current phase card
  var phaseHtml = '';
  if (currentPhase) {
    var introHtml = currentPhase.intro.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    var activitiesHtml = currentPhase.activities.map(function (a) {
      return '<a class="pw-activity-link" href="' + escHtml(a.href) + '">' +
        '<span class="pw-activity-icon">' + a.icon + '</span>' +
        '<span class="pw-activity-label">' + escHtml(a.label) + '</span>' +
        '<span class="pw-activity-arrow">&#8594;</span>' +
        '</a>';
    }).join('');

    var outputHtml = currentPhase.outputTask.sentences.map(function (s) {
      return '<li>' + s + '</li>';
    }).join('');

    phaseHtml = [
      '<div class="pw-phase-card">',
      '  <div class="pw-phase-card-header">',
      '    <div class="pw-phase-number">Phase ' + currentPhase.id + '</div>',
      '    <h2 class="pw-phase-title">' + escHtml(currentPhase.title) + '</h2>',
      '    <p class="pw-phase-subtitle">' + escHtml(currentPhase.subtitle) + '</p>',
      '  </div>',
      '  <div class="pw-phase-body">',
      '    <div class="pw-section-label">What to know</div>',
      '    <div class="pw-phase-intro">' + introHtml + '</div>',
      '    <div class="pw-section-label pw-section-label--mt">Activities</div>',
      '    <div class="pw-activities">' + activitiesHtml + '</div>',
      '    <div class="pw-section-label pw-section-label--mt">Output task</div>',
      '    <div class="pw-output-task">',
      '      <h3 class="pw-output-heading">' + escHtml(currentPhase.outputTask.heading) + '</h3>',
      '      <p class="pw-output-instruction">' + escHtml(currentPhase.outputTask.instruction) + '</p>',
      '      <ol class="pw-output-sentences">' + outputHtml + '</ol>',
      '    </div>',
      '  </div>',
      '  <div class="pw-phase-footer">',
      (currentPhase.id < 6 || true ?
        '<button class="pw-btn pw-btn-primary pw-unlock-btn" id="btn-unlock-phase">Ready to unlock Phase ' + (currentPhase.id + 1) + '? Take the check</button>' :
        '<p class="pw-complete-msg">You have completed all Level 1 phases. Well done.</p>'
      ),
      '  </div>',
      '</div>'
    ].join('\n');

    // Hide unlock button on phase 6 if it's the last L1 phase and phase 7 is coming soon
    if (currentPhase.id === 6) {
      phaseHtml = phaseHtml.replace(
        '<button class="pw-btn pw-btn-primary pw-unlock-btn" id="btn-unlock-phase">Ready to unlock Phase 7? Take the check</button>',
        '<div class="pw-complete-l1"><div class="pw-complete-badge">Level 1 complete</div><p>You have worked through all six Level 1 phases. Use the practice papers to consolidate before your exam.</p><a class="pw-btn pw-btn-primary" href="practice-papers.html?level=1">Go to practice papers</a></div>'
      );
    }
  } else if (PHASES_COMING.find(function (p) { return p.id === currentPhaseId; })) {
    phaseHtml = '<div class="pw-coming-soon"><p>This phase is coming soon for Level 2.</p></div>';
  }

  // Build completed phases summary
  var completedHtml = '';
  if (completed.length > 0) {
    var completedItems = completed.map(function (id) {
      var ph = PHASES.find(function (p) { return p.id === id; });
      if (!ph) return '';
      return '<a class="pw-completed-item" href="#" data-goto="' + id + '">' +
        '<span class="pw-completed-tick">&#10003;</span>' +
        '<span class="pw-completed-title">Phase ' + id + ': ' + escHtml(ph.title) + '</span>' +
        '</a>';
    }).filter(Boolean).join('');

    completedHtml = [
      '<div class="pw-completed-section">',
      '  <div class="pw-section-label pw-section-label--mt">Completed phases</div>',
      '  <div class="pw-completed-list">' + completedItems + '</div>',
      '</div>'
    ].join('\n');
  }

  app.innerHTML = [
    '<div class="pw-screen pw-pathway">',
    '  <div class="pw-strip-wrap">',
    '    <div class="pw-strip-label">Your progress</div>',
    '    <div class="pw-phase-strip">' + stripHtml + '</div>',
    '  </div>',
    phaseHtml,
    completedHtml,
    '  <div class="pw-reset-wrap">',
    '    <button class="pw-btn pw-btn-danger-ghost" id="btn-reset">Reset pathway</button>',
    '  </div>',
    '</div>'
  ].join('\n');

  // Wire up strip navigation
  app.querySelectorAll('[data-goto]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = parseInt(el.dataset.goto, 10);
      if (completed.indexOf(targetId) !== -1 || targetId === currentPhaseId) {
        gotoPhase(targetId);
      }
    });
  });

  // Wire up unlock button
  var unlockBtn = document.getElementById('btn-unlock-phase');
  if (unlockBtn) {
    unlockBtn.addEventListener('click', function () {
      startUnlockCheck(currentPhaseId);
    });
  }

  // Reset
  document.getElementById('btn-reset').addEventListener('click', function () {
    if (confirm('This will reset all pathway progress. Are you sure?')) {
      resetProgress();
      State.progress = null;
      renderLevelSelect();
    }
  });
}

function gotoPhase(phaseId) {
  var progress = State.progress;
  progress.currentPhase = phaseId;
  State.progress = progress;
  saveProgress(progress);
  renderPathway();
  window.scrollTo(0, 0);
}

// ── Unlock check ──────────────────────────────────────────────
function startUnlockCheck(phaseId) {
  var phase = PHASES.find(function (p) { return p.id === phaseId; });
  if (!phase) return;

  State.unlockPhaseId = phaseId;
  State.unlockQuestions = pickN(phase.unlockPool, 5);
  State.unlockAnswers = [];
  State.view = 'unlock';

  renderUnlockQuestion(0);
  window.scrollTo(0, 0);
}

function renderUnlockQuestion(idx) {
  var q = State.unlockQuestions[idx];
  var total = State.unlockQuestions.length;
  var app = document.getElementById('pathway-app');
  var pct = Math.round((idx / total) * 100);
  var phase = PHASES.find(function (p) { return p.id === State.unlockPhaseId; });

  app.innerHTML = [
    '<div class="pw-screen pw-unlock">',
    '  <div class="pw-unlock-header">',
    '    <button class="pw-back-btn" id="btn-back-to-pathway">&#8592; Back to phase</button>',
    '    <span class="pw-diag-label">Phase ' + State.unlockPhaseId + ' check &mdash; ' + (idx + 1) + ' of ' + total + '</span>',
    '  </div>',
    '  <div class="pw-diag-bar-wrap"><div class="pw-diag-bar-fill" style="width:' + pct + '%"></div></div>',
    '  <div class="pw-card pw-question-card">',
    '    <p class="pw-question-text">' + escHtml(q.q) + '</p>',
    '    <div class="pw-options" id="unlock-opts">',
    q.opts.map(function (opt, i) {
      return '<button class="pw-option" data-idx="' + i + '">' + escHtml(opt) + '</button>';
    }).join('\n'),
    '    </div>',
    '    <div class="pw-feedback" id="unlock-feedback" style="display:none"></div>',
    '    <button class="pw-btn pw-btn-primary pw-next-btn" id="unlock-next" style="display:none">',
    (idx + 1 < total ? 'Next question' : 'See result'),
    '    </button>',
    '  </div>',
    '</div>'
  ].join('\n');

  document.getElementById('btn-back-to-pathway').addEventListener('click', function () {
    renderPathway();
    window.scrollTo(0, 0);
  });

  var answered = false;
  app.querySelectorAll('.pw-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (answered) return;
      answered = true;
      var chosen = parseInt(btn.dataset.idx, 10);
      var correct = chosen === q.ans;
      State.unlockAnswers[idx] = correct ? 1 : 0;

      app.querySelectorAll('.pw-option').forEach(function (b) {
        b.disabled = true;
        if (parseInt(b.dataset.idx, 10) === q.ans) b.classList.add('pw-option--correct');
      });
      if (!correct) btn.classList.add('pw-option--wrong');

      var fb = document.getElementById('unlock-feedback');
      fb.style.display = 'block';
      fb.className = 'pw-feedback ' + (correct ? 'pw-feedback--correct' : 'pw-feedback--wrong');
      fb.innerHTML = (correct ? '<strong>Correct.</strong> ' : '<strong>Not quite.</strong> ') + escHtml(q.exp);

      document.getElementById('unlock-next').style.display = 'inline-block';
    });
  });

  document.getElementById('unlock-next').addEventListener('click', function () {
    if (idx + 1 < total) {
      renderUnlockQuestion(idx + 1);
    } else {
      showUnlockResult();
    }
  });
}

function showUnlockResult() {
  var score = State.unlockAnswers.reduce(function (a, b) { return a + b; }, 0);
  var total = State.unlockQuestions.length;
  var passed = score >= 4;
  var phaseId = State.unlockPhaseId;
  var nextPhaseId = phaseId + 1;
  var app = document.getElementById('pathway-app');

  var resultHtml;
  if (passed) {
    // Unlock next phase
    var progress = State.progress;
    if (progress.completed.indexOf(phaseId) === -1) {
      progress.completed.push(phaseId);
    }
    if (nextPhaseId <= 8) {
      progress.currentPhase = nextPhaseId;
    }
    State.progress = progress;
    saveProgress(progress);

    var nextPhase = PHASES.find(function (p) { return p.id === nextPhaseId; });
    var nextTitle = nextPhase ? nextPhase.title : (PHASES_COMING.find(function (p) { return p.id === nextPhaseId; }) || {}).title || 'the next phase';

    resultHtml = [
      '<div class="pw-unlock-result pw-unlock-result--pass">',
      '  <div class="pw-result-badge pw-result-badge--pass">',
      '    <span class="pw-result-num">' + score + '</span><span class="pw-result-denom">/' + total + '</span>',
      '  </div>',
      '  <h2 class="pw-heading">Phase ' + phaseId + ' unlocked</h2>',
      '  <p>You scored ' + score + ' out of ' + total + '. Phase ' + nextPhaseId + ' is now unlocked: <em>' + escHtml(nextTitle) + '</em>.</p>',
      '  <button class="pw-btn pw-btn-primary" id="btn-goto-next">Go to Phase ' + nextPhaseId + '</button>',
      '</div>'
    ].join('\n');
  } else {
    resultHtml = [
      '<div class="pw-unlock-result pw-unlock-result--fail">',
      '  <div class="pw-result-badge pw-result-badge--fail">',
      '    <span class="pw-result-num">' + score + '</span><span class="pw-result-denom">/' + total + '</span>',
      '  </div>',
      '  <h2 class="pw-heading">Not quite — try again</h2>',
      '  <p>You scored ' + score + ' out of ' + total + '. You need 4 out of 5 to unlock the next phase. Go back, review the activities, and have another go.</p>',
      '  <button class="pw-btn pw-btn-primary" id="btn-retry-unlock">Try again</button>',
      '  <button class="pw-btn pw-btn-ghost" id="btn-back-after-fail">Back to Phase ' + phaseId + '</button>',
      '</div>'
    ].join('\n');
  }

  app.innerHTML = '<div class="pw-screen pw-unlock-result-screen"><div class="pw-card">' + resultHtml + '</div></div>';

  if (passed) {
    document.getElementById('btn-goto-next').addEventListener('click', function () {
      renderPathway();
      window.scrollTo(0, 0);
    });
  } else {
    document.getElementById('btn-retry-unlock').addEventListener('click', function () {
      startUnlockCheck(phaseId);
    });
    document.getElementById('btn-back-after-fail').addEventListener('click', function () {
      renderPathway();
      window.scrollTo(0, 0);
    });
  }
}
