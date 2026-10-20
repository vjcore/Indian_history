/* MODERN ADD-ON: more entries before and after 1947 + restructured timeline phases.
   Entry format: [year, date label, title, kind, text, 1 = still "before independence" in 1947]
   kinds: L leader, M movement, A attack, W war, I incident  (edit freely, then reload) */
(() => {
/* 1. Split "Mughal Empire ... 1757" so Post-Mughal Period (1707 to 1757) is its own era */
ERAS.splice(10, 0, { n: 'Post-Mughal Period', r: '1707 to 1757' }); ERAS[9].r = '1526 to 1707';
const sh = (e, y) => e >= 10 ? e + 1 : (e === 9 && y >= 1707 ? 10 : e);
DATA.forEach(d => d.e = sh(d.e, d.y)); BOOKS.forEach(b => b[4] = sh(b[4], b[3]));

/* 2. Timeline phases for the Indian Independence section [start year, side, name] */
const B = 'Before Independence', A = 'After Independence';
window.PHASES = [[1757, B, 'Early Resistance and Company Rule'], [1858, B, 'After the Revolt: Crown Rule and Reform'], [1885, B, 'Birth of Congress and the Moderates'], [1905, B, 'Swadeshi, Extremists and Revolutionaries'], [1919, B, 'Gandhi Takes Charge: Mass Movements'], [1930, B, 'Civil Disobedience and Constitutional Politics'], [1942, B, 'Quit India, INA and Partition'],
  [1947, A, 'Independence, Partition and Integration'], [1950, A, 'Building the Republic'], [1964, A, 'Wars, Green Revolution and Emergency'], [1977, A, 'Coalitions, Conflict and Turmoil'], [1991, A, 'Liberalisation, Terror and the New India']];

/* 3. Extra entries */
const X = [
[1806, '10 July 1806', 'Vellore Mutiny', 'I', 'Sepoys at <b>Vellore</b> rose over new dress rules banning caste marks; about 100 British were killed before the revolt was crushed. An early warning before 1857.'],
[1855, '1855 to 1856', 'Santhal Rebellion (Hool)', 'M', '<b>Sidhu and Kanhu</b> led thousands of Santhals against moneylenders, zamindars and the Company. Crushed in 1856, it led to the Santhal Parganas district.'],
[1857, '10 May 1857 onward', 'Great Revolt of 1857', 'W', 'Began with <b>Mangal Pandey</b> (Barrackpore, 29 March) and the Meerut mutiny (10 May) over greased cartridges. Led by <b>Bahadur Shah Zafar</b>, <b>Rani Lakshmibai</b>, <b>Nana Sahib</b>, <b>Tantia Tope</b>, <b>Kunwar Singh</b> and <b>Begum Hazrat Mahal</b>. Crushed by 1858; the Company was abolished.'],
[1872, '17 January 1872', 'Kuka (Namdhari) Movement', 'M', '<b>Baba Ram Singh</b> led Sikh reformers who boycotted British goods and courts. About 65 Kukas were blown from cannons at Malerkotla.'],
[1897, '22 June 1897', 'Chapekar Brothers kill Rand', 'A', 'The <b>Chapekar brothers</b> shot plague officer Rand and Lt Ayerst in Pune over harsh plague measures. <b>Tilak</b> was jailed for sedition soon after.'],
[1899, '1899 to 1900', 'Birsa Munda and the Ulgulan', 'L', '<b>Birsa Munda</b> led the Munda "great tumult" in Chotanagpur against land loss and forced labour. He died in jail in 1900; the Chotanagpur Tenancy Act followed (1908).'],
[1905, '1905 to 1911', 'Swadeshi Movement', 'M', 'After the Partition of Bengal, the <b>boycott of British goods</b> and national education spread (7 August 1905). Leaders: <b>Lal-Bal-Pal</b> and Aurobindo Ghose.'],
[1905, '1905 to 1920', 'Lal-Bal-Pal and Aurobindo', 'L', '<b>Lala Lajpat Rai</b>, <b>Bal Gangadhar Tilak</b> ("Swaraj is my birthright") and <b>Bipin Chandra Pal</b> led the Extremists; <b>Sri Aurobindo</b> gave them a spiritual voice.'],
[1907, '22 August 1907', 'Bhikaji Cama unfurls a flag', 'L', 'At Stuttgart, <b>Madame Bhikaji Cama</b> raised an early Indian national flag at the International Socialist Congress, a first for Indian nationalism abroad.'],
[1908, '30 April 1908', 'Muzaffarpur Bomb and Alipore Case', 'A', '<b>Khudiram Bose</b> and <b>Prafulla Chaki</b> bombed a carriage aimed at Judge Kingsford; two women died. The Alipore trial followed, with Aurobindo acquitted in 1909.'],
[1909, '1 July 1909', 'Curzon Wyllie shot in London', 'A', '<b>Madan Lal Dhingra</b> shot Sir William Curzon Wyllie at the Imperial Institute, London. He was hanged on 17 August 1909.'],
[1912, '23 December 1912', 'Bomb attack on Viceroy Hardinge', 'A', 'During the capital-shifting procession at Delhi, <b>Rash Behari Bose</b> and <b>Basanta Biswas</b> bombed Viceroy Hardinge, who was wounded.'],
[1913, '1913', 'Ghadar Party founded', 'M', 'Indian immigrants in San Francisco, led by <b>Sohan Singh Bhakna</b> and <b>Lala Har Dayal</b>, planned an armed revolt against British rule.'],
[1914, '29 September 1914', 'Komagata Maru Incident', 'I', 'The ship carrying 376 Indians, mostly Sikhs, was refused entry at <b>Vancouver</b>. Back at Budge Budge near Calcutta, police firing killed 19.'],
[1916, '1916', 'Home Rule Leagues', 'M', '<b>Tilak</b> (April, Belgaum) and <b>Annie Besant</b> (September, Madras) started leagues demanding self-government.'],
[1917, 'April 1917', 'Champaran Satyagraha', 'M', 'Gandhi\'s <b>first satyagraha in India</b>, in Bihar, against forced indigo (tinkathia) cultivation. Rajkumar Shukla brought him there.'],
[1918, '1918', 'Kheda Satyagraha', 'M', 'Gujarat farmers refused revenue after crop failure. <b>Vallabhbhai Patel</b> rose to prominence leading it.'],
[1919, '13 April 1919', 'Jallianwala Bagh Massacre', 'A', 'General <b>Dyer</b> ordered firing on an unarmed Baisakhi crowd in Amritsar; officially 379 died, Indian estimates exceed 1,000. <b>Tagore</b> gave up his knighthood; <b>Udham Singh</b> killed O\'Dwyer in London in 1940.'],
[1919, '1919 to 1924', 'Khilafat Movement', 'M', 'Led by <b>Mohammad Ali and Shaukat Ali</b>, it defended the Ottoman Caliph and joined Gandhi\'s Non-Cooperation, creating Hindu-Muslim unity.'],
[1921, 'August to November 1921', 'Moplah (Malabar) Rebellion', 'I', 'Peasant revolt in Malabar, Kerala. In the <b>Wagon Tragedy</b> (November), about 60 to 70 prisoners suffocated in a railway wagon.'],
[1922, '1922 to 1924', 'Rampa Rebellion', 'M', '<b>Alluri Sitarama Raju</b> led tribal fighters against forest laws in the Godavari hills of Andhra. He was killed in 1924.'],
[1924, '1924 to 1925', 'Vaikom Satyagraha', 'M', 'Non-violent campaign in Kerala for the right of lower castes to use roads near the Vaikom temple, supported by <b>Periyar</b> and Gandhi.'],
[1925, '9 August 1925', 'Kakori Train Action', 'A', 'The <b>Hindustan Republican Association</b> looted a government cash train near Lucknow. <b>Ram Prasad Bismil</b>, <b>Ashfaqulla Khan</b>, Roshan Singh and Rajendra Lahiri were hanged (1927).'],
[1927, '20 March 1927', 'Mahad Satyagraha', 'M', '<b>B. R. Ambedkar</b> led Dalits to drink water from the Chavdar Tank at Mahad, a landmark in the fight against untouchability.'],
[1928, '1928', 'Bardoli Satyagraha', 'M', 'Gujarat peasants refused a tax hike. Its success earned Vallabhbhai Patel the title <b>Sardar</b>.'],
[1928, '30 October to 17 December 1928', 'Lajpat Rai dies; Saunders killed', 'A', 'Lathi-charged at a Simon protest, <b>Lajpat Rai</b> died on 17 November. <b>Bhagat Singh</b>, <b>Rajguru</b> and <b>Chandrashekhar Azad</b> shot ASP Saunders in revenge.'],
[1929, '8 April 1929', 'Assembly Bomb Case', 'A', '<b>Bhagat Singh</b> and <b>Batukeshwar Dutt</b> threw harmless bombs in the Central Assembly, crying "Inquilab Zindabad". <b>Jatin Das</b> died after a 63-day hunger strike (13 September).'],
[1930, '12 March to 6 April 1930', 'Dandi March (Salt Satyagraha)', 'M', 'Gandhi and 78 followers walked about 240 miles from Sabarmati to Dandi to break the salt law, launching <b>Civil Disobedience</b>. Sarojini Naidu led the Dharasana raid.'],
[1930, '18 April 1930', 'Chittagong Armoury Raid', 'A', '<b>Surya Sen (Masterda)</b> and youth revolutionaries seized armouries in Chittagong. Sen was hanged in 1934; <b>Pritilata Waddedar</b> led an attack in 1932.'],
[1930, '23 April 1930', 'Qissa Khwani Bazaar Massacre', 'A', 'British troops fired on Khudai Khidmatgar protesters in Peshawar; Garhwal Rifles soldiers refused to fire. <b>Abdul Ghaffar Khan</b> ("Frontier Gandhi") led the non-violent movement.'],
[1930, '1930 to 1932', 'Round Table Conferences', 'I', 'Three London conferences on India\'s future. Gandhi attended the second (1931); <b>Ambedkar</b> argued for Dalit rights.'],
[1931, '23 March 1931', 'Bhagat Singh, Sukhdev and Rajguru hanged', 'A', 'The three were executed in Lahore jail, now remembered as <b>Martyrs\' Day</b>. <b>Chandrashekhar Azad</b> had died fighting police at Alfred Park, Allahabad (27 February).'],
[1932, '24 September 1932', 'Poona Pact', 'M', 'Gandhi and <b>Ambedkar</b> agreed reserved seats (148) for Depressed Classes within general electorates, replacing separate electorates.'],
[1939, 'May 1939', 'Forward Bloc formed', 'M', 'After resigning as Congress president, <b>Subhas Chandra Bose</b> founded the Forward Bloc to push for a militant struggle.'],
[1940, '1940', 'Maulana Azad and Individual Satyagraha', 'L', '<b>Maulana Abul Kalam Azad</b> presided over Congress (1940 to 1946). <b>Vinoba Bhave</b> began the Individual Satyagraha in October.'],
[1941, 'January 1941', 'Bose\'s Great Escape', 'I', 'Subhas Bose slipped out of house arrest in Calcutta and reached Germany via Kabul, to seek foreign help against Britain.'],
[1942, '8 August 1942', 'Quit India Movement', 'M', 'Gandhi\'s "<b>Do or Die</b>" call at Gowalia Tank, Bombay. Leaders were arrested overnight; <b>Aruna Asaf Ali</b> hoisted the flag, <b>Usha Mehta</b> ran a secret radio, and parallel governments rose at Ballia, Tamluk and Satara.'],
[1942, '1930 to 1947', 'Women of the freedom struggle', 'L', '<b>Sarojini Naidu</b>, <b>Kasturba Gandhi</b>, <b>Annie Besant</b>, <b>Matangini Hazra</b>, <b>Kanaklata Barua</b>, <b>Rani Gaidinliu</b> and <b>Captain Lakshmi Sahgal</b> led marches, jail-going and armed service.'],
[1943, '1943 to 1945', 'Azad Hind Fauj (INA)', 'W', '<b>Subhas Bose</b> led the Indian National Army from Singapore (July 1943) and formed the Provisional Government (21 October). "Delhi Chalo" reached Imphal and Kohima (1944). Bose\'s reported death: 18 August 1945.'],
[1943, '1943 to 1944', 'Bengal Famine', 'I', 'War-time shortages, hoarding and policy failure caused an estimated <b>2 to 3 million deaths</b> in Bengal.'],
[1945, 'November 1945', 'INA Trials at Red Fort', 'I', 'Officers <b>Shah Nawaz Khan, Prem Sahgal and Gurbaksh Singh Dhillon</b> were tried; nationwide protests followed and <b>Bhulabhai Desai</b> led the defence.'],
[1946, 'March to June 1946', 'Cabinet Mission', 'I', 'A British mission (Pethick-Lawrence, Cripps, Alexander) proposed a federal union and a Constituent Assembly. An <b>Interim Government</b> under Nehru took office on 2 September.'],
[1946, '16 August 1946', 'Direct Action Day (Calcutta Killings)', 'A', 'The Muslim League\'s call triggered communal violence in Calcutta that killed thousands and spread to Noakhali and Bihar.'],
[1947, 'June to August 1947', 'Partition of India and the Radcliffe Line', 'I', 'Mountbatten Plan (3 June), Indian Independence Act (18 July) and the <b>Radcliffe Line</b> (17 August) split the subcontinent. About 15 million were displaced; estimates of deaths range from 1 to 2 million.', 1],
[1947, 'October 1947 to January 1949', 'Kashmir Accession and First Indo-Pak War', 'W', 'Tribal raiders entered Kashmir (22 October); <b>Maharaja Hari Singh</b> acceded on 26 October and Indian troops were airlifted. A UN ceasefire came on 1 January 1949.'],
[1948, 'September 1948', 'Operation Polo and Integration of States', 'W', '<b>Sardar Patel</b> and V. P. Menon integrated <b>562 princely states</b>. Hyderabad joined after Operation Polo (13 to 17 September 1948).'],
[1964, '9 June 1964', 'Lal Bahadur Shastri becomes PM', 'L', '<b>"Jai Jawan Jai Kisan"</b> leader who guided India through the 1965 war; he died at Tashkent on 11 January 1966.'],
[1966, '24 January 1966', 'Indira Gandhi becomes PM', 'L', 'India\'s first woman Prime Minister. She led the 1971 war and bank nationalisation, and imposed the Emergency.'],
[1966, '1966 to 1970s', 'Green Revolution', 'M', 'High-yield wheat and rice, irrigation and fertiliser, led by <b>M. S. Swaminathan</b> and Norman Borlaug, ended India\'s dependence on food imports.'],
[1969, '19 July 1969', 'Bank Nationalisation', 'M', 'Fourteen major banks were nationalised to widen credit to farmers and small businesses.'],
[1971, '3 to 16 December 1971', 'Bangladesh Liberation War', 'W', 'India backed East Pakistan\'s liberation. On 16 December about <b>93,000 Pakistani troops</b> surrendered at Dhaka (Gen. Aurora; Field Marshal Manekshaw led the army).'],
[1973, '1973', 'Chipko Movement', 'M', 'Villagers in Uttarakhand hugged trees to stop felling. <b>Gaura Devi</b> and <b>Sunderlal Bahuguna</b> became symbols of environmental activism.'],
[1974, '1974 to 1975', 'JP Movement (Total Revolution)', 'M', '<b>Jayaprakash Narayan</b> led student and public protests against corruption in Bihar and Gujarat, which shook the government.'],
[1975, '25 June 1975 to 21 March 1977', 'The Emergency', 'I', 'Declared under Article 352: press censorship, mass arrests and forced sterilisation. The <b>Janata Party</b> won in 1977 and <b>Morarji Desai</b> became PM.'],
[1984, '1 to 8 June 1984', 'Operation Blue Star', 'A', 'Army operation to remove militants led by <b>Bhindranwale</b> from the Golden Temple, Amritsar; heavy casualties and deep Sikh anger.'],
[1984, '31 October 1984', 'Indira Gandhi assassinated', 'A', 'She was shot by her bodyguards in Delhi; <b>Rajiv Gandhi</b> became PM. Anti-Sikh riots followed, killing thousands.'],
[1984, '2 to 3 December 1984', 'Bhopal Gas Tragedy', 'I', 'A methyl isocyanate leak at <b>Union Carbide</b> killed thousands and injured hundreds of thousands, India\'s worst industrial disaster.'],
[1989, '1989 to 1990', 'Militancy in Kashmir', 'I', 'An armed insurgency began; in January 1990 many <b>Kashmiri Pandits</b> left the Valley. Its causes and effects remain debated.'],
[1991, '24 July 1991', 'Economic Liberalisation', 'M', 'PM <b>P. V. Narasimha Rao</b> and Finance Minister <b>Manmohan Singh</b> dismantled the licence raj and opened the economy.'],
[1998, '11 and 13 May 1998', 'Pokhran-II (Operation Shakti)', 'I', 'India tested five nuclear devices under PM Vajpayee and declared itself a nuclear weapon state.'],
[1999, 'May to 26 July 1999', 'Kargil War', 'W', 'Intruders occupied heights in Kargil; <b>Operation Vijay</b> recaptured them. 26 July is <b>Kargil Vijay Diwas</b>.'],
[1999, '24 December 1999', 'IC-814 Hijack', 'A', 'An Indian Airlines flight from Kathmandu was hijacked to Kandahar; three jailed militants were released to end it.'],
[2001, '13 December 2001', 'Attack on Parliament', 'A', 'Five gunmen attacked Parliament in Delhi; nine security and staff members died and all attackers were killed.'],
[2001, '26 January 2001', 'Gujarat (Bhuj) Earthquake', 'I', 'A magnitude 7.7 quake killed about 20,000 people in Kutch.'],
[2002, '24 September 2002', 'Akshardham Temple Attack', 'A', 'Gunmen attacked the Gandhinagar temple complex; about 30 people were killed before NSG commandos ended the siege.'],
[2002, '25 July 2002', 'A. P. J. Abdul Kalam becomes President', 'L', 'The "<b>Missile Man</b>" of ISRO and DRDO became the 11th President, known as the People\'s President.'],
[2004, '26 December 2004', 'Indian Ocean Tsunami', 'I', 'Waves devastated Tamil Nadu, Andaman and Nicobar and Andhra coasts; thousands died in India.'],
[2006, '11 July 2006', 'Mumbai Train Blasts (7/11)', 'A', 'Seven bomb blasts on suburban trains killed about 189 commuters.'],
[2012, '16 December 2012', 'Nirbhaya Case and Protests', 'M', 'A gang-rape in Delhi sparked nationwide protests and the stronger <b>Criminal Law (Amendment) Act, 2013</b>.'],
[2013, 'June 2013', 'Uttarakhand (Kedarnath) Floods', 'I', 'Cloudbursts and floods killed thousands of pilgrims and locals in the Himalayas.'],
[2016, '18 and 29 September 2016', 'Uri Attack and Surgical Strikes', 'A', 'Militants killed 19 soldiers at Uri; India announced cross-LoC <b>surgical strikes</b> on 29 September.'],
[2019, '26 February 2019', 'Balakot Air Strike', 'W', 'Indian jets struck a militant camp in Pakistan after the Pulwama attack; a dogfight and the return of pilot <b>Abhinandan</b> followed.'],
[2019, '5 August 2019', 'Article 370 abrogated', 'I', 'Jammu and Kashmir lost special status and was reorganised into two Union Territories, J&amp;K and Ladakh.'],
[2020, '15 June 2020', 'Galwan Valley Clash', 'W', 'A hand-to-hand clash with Chinese troops in Ladakh killed 20 Indian soldiers, the deadliest India-China clash since 1967.'],
[2020, 'November 2020 to 2021', 'Farmers\' Protest', 'M', 'Farmers camped at Delhi\'s borders against three farm laws, which were repealed in 2021.'],
[2023, '2 June 2023', 'Balasore Train Accident', 'I', 'A three-train collision in Odisha killed about 290 people, one of India\'s worst rail accidents.'],
[2025, '22 April 2025', 'Pahalgam Attack', 'A', 'Militants killed 26 civilians, mostly tourists, in Baisaran meadow, Kashmir.'],
[2025, '7 to 10 May 2025', 'Operation Sindoor', 'W', 'India struck militant and military targets in Pakistan after Pahalgam; a ceasefire followed on 10 May.']];

/* 4. Merge into DATA in date order, then re-number */
const K = { L: ['Leader', ['leaders']], M: ['Movement', ['movements']], A: ['Attack', ['attacks']], W: ['War', ['attacks', 'wars']], I: ['Incident', ['attacks']] };
const have = new Set(DATA.map(d => d.t.toLowerCase()));
const eraOf = (y, pre) => pre ? 12 : y >= 1947 ? 13 : y >= 1858 ? 12 : 11;
const N = X.filter(x => !have.has(x[2].toLowerCase())).map(x => ({ t: x[2], d: x[1], g: K[x[3]][0], y: x[0], e: eraOf(x[0], x[5]), s: ['independence', ...K[x[3]][1]], b: x[4] })).sort((a, b) => a.y - b.y);
const out = []; let k = 0, ly = -9e9;
DATA.forEach(x => { const ey = x.e === 12 && x.y === 1950 ? ly : x.y; ly = ey; /* ignore the 1950 placeholder on 'Tagore' / 'J. C. Bose' */
  while (k < N.length && N[k].e <= x.e && (N[k].y < ey || (N[k].y === ey && N[k].e < x.e))) out.push(N[k++]); out.push(x) });
while (k < N.length) out.push(N[k++]);
out.forEach((x, i) => x.i = i); DATA.splice(0, DATA.length, ...out);

/* 5. Tag existing modern entries so the new sections are complete */
DATA.forEach(d => { if (d.e === 13 && !d.s.includes('independence')) d.s.push('independence');
  if (d.e >= 12 && !d.bk) { const a = d.t + ' ' + d.g;
    if (/\bWar\b|attack|bombing|assassinat|Operation|Revolt|Mutiny|Line of Control|IPKF|Chauri|violence|Blue Star/i.test(a) && !d.s.includes('attacks')) d.s.push('attacks');
    if (/Movement|Samaj|Sabha|Satyagraha|Revolution|Swaraj|Republican Association|Strike|Against Corruption|Pact|Split/i.test(a) && !d.s.includes('movements')) d.s.push('movements') } });
})();
