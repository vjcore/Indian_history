# Usage: python tools/build_data.py tools/Indian_History_Single_Timeline.docx data/data.js
import re, sys, json, html
from docx import Document
E = html.escape
R = {k: re.compile(v, re.I) for k, v in {
 'places': r'Mohenjo|Harappa|Lothal|Dholavira|Rakhigarhi|Mehrgarh|Bhimbetka|Bodh Gaya|Sarnath|Sanchi|Lumbini|Kushinagar|Taxila|Nalanda|Ajanta|Ellora|Hampi|Khajuraho|Konark|Mahabalipuram|Thanjavur|Taj Mahal|Red Fort|Fatehpur|Qutb|Golden Temple|Pataliputra|Varanasi|Ujjain|Madurai|Amaravati|Jallianwala',
 'kingdoms': r'dynast|Empire|kingdom|Mahajanapada|Sultanate|Sangam|Chola|Chera|Pandya|Gupta|Maurya|Satavahana|Maratha|Mughal|Vijayanagara|Rashtrakuta|Pallava|Chalukya|Shunga|Kushan|Rajput|Ahom|Nanda',
 'wars': r'\bBattles?\b|\bWars?\b|invasion|conquer|siege|Revolt|Mutiny|campaign|Panipat|Plassey|Buxar|Haldighati',
 'religion': r'Buddh|Jain|Hindu|Veda|Vedic|Upanishad|Sikh|Islam|Sufi|Bhakti|Christian|Zoroast|Parsi|Tirthankara|Council|dharma|spiritual|Ajivika|Charvaka|darshana',
 'science': r'Science|Mathemat|astronom|Medicine|Ayurved|Sushruta|Charaka|Aryabhata|Brahmagupta|Bhaskara|zero|metallurg|wootz|Zinc|surgery|ISRO|satellite|Chandrayaan|nuclear|technolog|calendar',
 'architecture': r'Architecture|stupa|temple|\bfort\b|Taj|mosque|caves?\b|pillar|monument|Great Bath|palace|Minar|gateway|tomb|Dravidian|Nagara',
 'languages': r'Language|script|Literature|Sanskrit|Tamil|Prakrit|Pali|Brahmi|Kharoshthi|Persian|Urdu|epic|poet|Kalidasa|Natya|grammar|Ramayana|Mahabharata',
 'visitors': r'Foreign|travell|Megasthenes|Fa-?Hien|Hiuen|Xuanzang|I-?tsing|Al-?Biruni|Ibn Battuta|Marco Polo|Bernier|Tavernier|Herodotus|Ctesias|Ptolemy|ambassador|envoy|visitor',
 'rulers': r'\br\. |\breign|\bruler|Emperor|Sultan|Maharaja|Peshwa|Viceroy|Governor-General|Prime Minister|President',
 'leaders': r'reformer|founder|Gandhi|Nehru|Patel|Ambedkar|Tilak|Bose|Rammohan|Vivekananda|Dayananda|Phule|Ashoka|Chanakya|Shankara|Ramanuja|Buddha|Mahavira|Shivaji|Lakshmibai|Bhagat Singh|Tagore|Naidu|Kabir|Nanak|Chaitanya|Basava|Siddhartha',
 'sources': r'inscription|edict|Chronicle|Indica|Arthashastra|Rajatarangini|Ain-i-Akbari|Akbarnama|Baburnama|Tarikh|manuscript|Foreign writers|Hathigumpha|account'}.items()}
IND = re.compile(r'Congress|Quit India|Swadeshi|Non-Cooperation|Civil Disobedience|Partition|Independence|Viceroy|\bAct\b|Revolt|1857|Mutiny|Home Rule|Khilafat|Satyagraha|Dandi|Round Table|Cabinet Mission|Constitution', re.I)

def yr(l):
    s = l.replace('–', '-'); bce = 'BCE' in s
    m = re.search(r'(\d+)(?:st|nd|rd|th)\s+(century|millennium)', s)
    if m:
        n = int(m[1]); v = n*100-50 if m[2] == 'century' else n*1000-500
        return -v if bce else v
    m = (not bce and re.search(r'\b(1\d{3}|20\d{2})\b', s) and re.search(r'(1\d{3}|20\d{2})()', s)) or re.search(r'(\d[\d,]*)(\s+million)?', s)  # '22 October 1764' -> 1764, not 22
    if not m: return None
    n = int(m[1].replace(',', '')) * (10**6 if m[2] else 1)
    return -n if (bce or 'years ago' in s) else n

eras, data, y, e = [], [], -2000000, -1
for p in Document(sys.argv[1]).paragraphs:
    full = ''.join(r.text for r in p.runs)
    if p.style is not None and p.style.name.startswith('Heading'):
        t = full.strip()
        if t.startswith('Notes on Accuracy'): break
        m = re.match(r'(.*)\s*\(([^()]*)\)\s*$', t)  # last bracket = date range, so names like 'Indus Valley (Harappan) ...' stay whole
        eras.append({'n': E(m[1] if m else t), 'r': E(m[2] if m else '')}); e += 1; continue
    m = re.search(r'\s+—\s+', full)
    if e < 0 or not m or not (p.runs and p.runs[0].bold): continue
    label = full[:m.start()].strip(); s = m.end(); pos = 0; bh = ''; bolds = []
    for r in p.runs:
        a, b = pos, pos + len(r.text); pos = b
        if b <= s: continue
        x = r.text[max(0, s-a):]; h = E(x)
        if r.bold:
            h = f'<b>{h}</b>'
            if not bolds and x.strip(): bolds.append(x.strip(' :,;'))
        elif r.italic: h = f'<i>{h}</i>'
        bh += h
    g = re.search(r'\(([^()]*)\)\s*$', label)
    date = label[:g.start()].strip() if g else label; tag = g[1] if g else ''
    title = bolds[0] if bolds and 2 < len(bolds[0]) < 90 else (tag or date)
    v = yr(label); y = v if v is not None else y
    txt = f'{label} {title} {re.sub("<[^>]+>", "", bh)[:200]}'
    secs = [k for k, r in R.items() if r.search(txt)]
    if 1857 <= y <= 1950 and IND.search(txt): secs.append('independence')
    data.append({'i': len(data), 't': E(title), 'd': E(date), 'g': E(tag), 'y': y, 'e': e, 's': secs, 'b': bh.strip()})
open(sys.argv[2], 'w', encoding='utf-8').write('window.ERAS=' + json.dumps(eras, ensure_ascii=False) + ';\nwindow.DATA=' + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(len(eras), 'eras,', len(data), 'entries')
for k in list(R) + ['independence']: print(k, sum(k in d['s'] for d in data), end=' | ')
print(); print([d['t'] for d in data[:4]], data[5]['y'], data[-1]['d'])
