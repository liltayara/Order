const { useState, useEffect, useMemo, useRef } = React;

// ══════════════════════════════════════════════════════════════════════════════
// ICONS — مكتبة أيقونات SVG خفيفة الوزن (لا تعتمد على مكتبات خارجية للأيقونات)
// ══════════════════════════════════════════════════════════════════════════════
function makeIcon(paths, extraViewBox) {
  return function Icon({ size = 20, strokeWidth = 2, className = "", style = {} }) {
    return (
      <svg width={size} height={size} viewBox={extraViewBox || "0 0 24 24"} fill="none"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        className={className} style={style}>
        {paths}
      </svg>
    );
  };
}

const Home = makeIcon(<><path d="M3 11l9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></>);
const User = makeIcon(<><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>);
const Users = makeIcon(<><circle cx="9" cy="8" r="3.2"/><path d="M2.5 21c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><circle cx="17.5" cy="9" r="2.6"/><path d="M15 15.2c2.7.3 5 2.1 5 5.3"/></>);
const Bike = makeIcon(<><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M12 17.5l2-9h4M12 17.5l-4-6-2 6M8 8.5h3l2 3"/></>);
const Package = makeIcon(<><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></>);
const Settings = makeIcon(<><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.2-1.6l2-1.5-2-3.4-2.3.9a7 7 0 0 0-2.7-1.6L13.4 2h-2.8l-.4 2.8a7 7 0 0 0-2.7 1.6l-2.3-.9-2 3.4 2 1.5A7 7 0 0 0 4.8 12a7 7 0 0 0 .2 1.6l-2 1.6 2 3.4 2.3-1a7 7 0 0 0 2.7 1.6l.4 2.8h2.8l.4-2.8a7 7 0 0 0 2.7-1.6l2.3 1 2-3.4-2-1.6c.1-.5.2-1 .2-1.6z"/></>);
const LogOut = makeIcon(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></>);
const Bell = makeIcon(<><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></>);
const TrendingUp = makeIcon(<><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></>);
const Clock = makeIcon(<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>);
const DollarSign = makeIcon(<><path d="M12 2v20"/><path d="M17 6.5c0-1.8-2-3-5-3s-5 1.3-5 3 2 2.8 5 3.3 5 1.7 5 3.4-2 3-5 3-5-1.2-5-3"/></>);
const ChevronRight = makeIcon(<path d="M9 6l6 6-6 6"/>);
const Star = makeIcon(<path d="M12 2l3 6.5 7 .8-5.2 4.8L18 21l-6-3.6L6 21l1.2-6.9L2 9.3l7-.8z"/>);
const Navigation = makeIcon(<path d="M12 2l8 20-8-4-8 4z"/>);
const Phone = makeIcon(<path d="M5 4h4l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2.2 2C10 20.5 3.5 14 3 5.2A2 2 0 0 1 5 4z"/>);
const Check = makeIcon(<path d="M20 6L9 17l-5-5"/>);
const X = makeIcon(<><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>);
const Plus = makeIcon(<><path d="M12 5v14"/><path d="M5 12h14"/></>);
const History = makeIcon(<><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/><path d="M12 7v5l4 2"/></>);
const ArrowLeft = makeIcon(<><path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/></>);
const BarChart2 = makeIcon(<path d="M6 20V10M12 20V4M18 20v-6"/>);
const CheckCircle = makeIcon(<><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9"/></>);
const Eye = makeIcon(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>);
const EyeOff = makeIcon(<><path d="M3 3l18 18"/><path d="M10.6 5.2A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a15.4 15.4 0 0 1-3.2 4.1M6.5 6.6C4 8.3 2 12 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"/><path d="M9.5 9.7A3 3 0 0 0 12 15a3 3 0 0 0 2.6-1.5"/></>);
const Wallet = makeIcon(<><path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M16 12h4v3h-4a1.5 1.5 0 0 1 0-3z"/></>);
const AlertCircle = makeIcon(<><circle cx="12" cy="12" r="9"/><path d="M12 8v5"/><path d="M12 16.5h.01"/></>);
const Shield = makeIcon(<path d="M12 2l8 3.5v6c0 5-3.5 8.5-8 10.5-4.5-2-8-5.5-8-10.5v-6z"/>);
const Truck = makeIcon(<><path d="M3 6h11v9H3z"/><path d="M14 9h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.6"/><circle cx="18" cy="17.5" r="1.6"/></>);
const RefreshCw = makeIcon(<><path d="M21 12a9 9 0 0 1-15.4 6.4L3 16"/><path d="M3 12a9 9 0 0 1 15.4-6.4L21 8"/><path d="M3 16v4h4"/><path d="M21 8V4h-4"/></>);
const ToggleLeft = makeIcon(<><rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="8" cy="12" r="3"/></>);
const MapPin = makeIcon(<><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></>);
const SearchIcon = makeIcon(<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>);
const Sun = makeIcon(<><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2.5 12H5M19 12h2.5M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/></>);
const Moon = makeIcon(<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>);
const Download = makeIcon(<><path d="M12 3v12.5M7 11l5 5 5-5"/><path d="M4 19.5h16"/></>);
const CreditCard = makeIcon(<><rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M6 14.5h4"/></>);
const Tag = makeIcon(<><path d="M20.5 12.7L12.7 20.5a2 2 0 0 1-2.83 0l-6.37-6.37a2 2 0 0 1 0-2.83L11.3 3.5A2 2 0 0 1 12.7 3H19a1 1 0 0 1 1 1v6.3a2 2 0 0 1-.5 1.4z"/><circle cx="15.5" cy="7.5" r="1.4"/></>);
const Copy = makeIcon(<><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M5 15.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></>);
const XCircle = makeIcon(<><circle cx="12" cy="12" r="9"/><path d="M9.5 9.5l5 5M14.5 9.5l-5 5"/></>);
const Landmark = makeIcon(<><path d="M3 21h18"/><path d="M4 21V10M9 21V10M15 21V10M20 21V10"/><path d="M2 10l10-6 10 6"/></>);
const ArrowDownCircle = makeIcon(<><circle cx="12" cy="12" r="9"/><path d="M12 7v8M8.5 12l3.5 3.5L15.5 12"/></>);
const Camera = makeIcon(<><path d="M4 8h3l1.5-2.5h7L17 8h3a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 20 20H4a1.5 1.5 0 0 1-1.5-1.5v-9A1.5 1.5 0 0 1 4 8z"/><circle cx="12" cy="14" r="3.6"/></>);
const UserCheck = makeIcon(<><circle cx="9" cy="8" r="4"/><path d="M2.5 21c0-4 3-6.5 6.5-6.5 1 0 2 .2 2.8.6"/><path d="M15.5 15.5l2 2 4-4"/></>);
const Crosshair = makeIcon(<><circle cx="12" cy="12" r="7.5"/><path d="M12 2.5v4M12 17.5v4M2.5 12h4M17.5 12h4"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></>);
const Inbox = makeIcon(<><path d="M3 12.5h4.5l1.7 2.8h5.6l1.7-2.8H21"/><path d="M5.2 5.5h13.6L21 12.2v6a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 18.2v-6z"/></>);
const MessageCircle = makeIcon(<path d="M12 3C6.9 3 3 6.4 3 10.8c0 2.5 1.3 4.7 3.4 6.2-.1 1.1-.5 2.2-1.4 3.3 1.6-.1 3-.6 4.2-1.5.9.2 1.8.3 2.8.3 5.1 0 9-3.4 9-7.8S17.1 3 12 3z"/>);

// شعار التطبيق (أيقونة مخصّصة موحّدة — سبلاش، شاشة الترحيب، وأيقونة المتصفح)
function AppMark({ size = 36, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
fill="currentColor" stroke="none">
<path d="M2304 7420 c-11 -4 -33 -22 -47 -40 -26 -31 -27 -35 -27 -164 0 -131
0 -134 30 -177 l30 -44 0 -492 0 -491 26 -31 c14 -17 42 -35 62 -41 51 -14
1803 -14 1854 0 20 6 48 24 62 41 23 28 26 39 26 116 0 82 -1 86 -35 126 -55
64 -78 136 -70 227 3 41 8 183 11 314 5 236 6 240 30 269 23 27 24 35 24 168
0 106 -4 147 -15 169 -33 63 17 60 -1007 59 -513 0 -942 -4 -954 -9z m1846
-230 l0 -50 -890 0 -890 0 0 50 0 50 890 0 890 0 0 -50z"/>
<path d="M6165 7073 c-137 -7 -289 -24 -320 -37 -60 -26 -81 -85 -51 -145 18
-34 54 -51 109 -51 55 0 391 56 416 69 11 6 44 11 74 11 136 0 216 -72 217
-196 0 -40 -6 -60 -30 -96 -16 -24 -39 -53 -50 -63 -23 -21 -26 -53 -6 -61 21
-8 112 41 163 89 61 56 86 108 86 178 -1 110 -73 214 -183 263 -90 41 -197 51
-425 39z"/>
<path d="M6450 6795 c-81 -35 -229 -84 -344 -114 -97 -25 -102 -27 -119 -63
-25 -51 -15 -93 26 -119 27 -17 42 -19 97 -13 36 3 80 7 99 8 l34 1 36 -107
c22 -69 32 -111 26 -117 -6 -5 -307 -108 -670 -229 -363 -121 -667 -223 -676
-227 -13 -5 -24 22 -64 152 -75 248 -76 252 -57 262 10 5 109 32 222 60 225
57 240 65 240 130 0 46 -28 78 -72 85 -18 3 -112 7 -208 10 -177 5 -289 19
-441 56 -175 42 -248 13 -273 -107 -16 -71 39 -171 121 -224 58 -36 137 -66
188 -71 l39 -4 58 -184 c32 -102 58 -193 58 -202 0 -10 -49 -50 -127 -104 -71
-48 -176 -125 -235 -171 -58 -45 -111 -83 -117 -83 -5 0 -38 21 -73 48 -35 26
-100 67 -145 90 -46 24 -83 47 -83 51 0 5 7 14 15 21 8 7 20 30 27 51 l11 39
232 0 c212 0 233 2 248 18 21 23 22 62 3 88 -14 19 -37 19 -1071 19 -1034 0
-1057 0 -1071 -19 -8 -11 -14 -32 -14 -48 0 -47 30 -58 175 -61 l128 -2 75
-118 75 -119 -86 -79 c-105 -97 -169 -177 -235 -292 -64 -112 -103 -232 -105
-323 l-2 -69 30 3 30 3 -3 -92 c-13 -363 194 -764 498 -968 l87 -58 -221 -7
c-219 -6 -460 -21 -525 -32 -21 -3 -30 -9 -24 -15 28 -28 431 -60 1148 -90
306 -14 2802 -20 3190 -9 733 22 1432 64 1503 91 61 23 -16 34 -400 55 l-118
6 75 48 c315 206 518 633 476 999 -41 349 -228 659 -511 846 -166 109 -384
175 -585 177 -128 1 -269 -18 -262 -36 2 -6 16 -48 32 -94 22 -68 30 -82 44
-76 33 14 283 17 355 4 268 -48 523 -250 646 -512 72 -155 103 -344 81 -496
-50 -339 -284 -615 -611 -720 -249 -80 -543 -49 -764 81 -324 190 -496 565
-431 940 39 224 159 412 357 558 51 38 67 56 63 68 -32 79 -95 252 -95 261 0
15 -9 13 -69 -21 -178 -100 -393 -335 -498 -544 -42 -82 -83 -217 -90 -292 -5
-54 -3 -63 12 -69 17 -7 66 3 106 20 15 6 16 2 8 -36 -11 -60 -11 -221 1 -298
52 -325 262 -626 554 -795 12 -7 -376 -10 -1178 -10 -658 0 -1196 2 -1196 5 0
3 27 22 60 43 83 53 222 187 293 282 56 75 157 262 157 291 0 14 -4 16 -118
39 -94 19 -89 20 -101 -18 -35 -106 -174 -284 -286 -367 -175 -129 -376 -189
-598 -177 -299 16 -564 171 -729 427 -93 145 -138 302 -138 486 0 171 36 304
119 444 40 66 148 190 166 190 13 -1 217 -340 212 -353 -2 -6 -23 19 -47 54
-89 131 -151 210 -163 206 -20 -6 -85 -97 -126 -177 -209 -400 -34 -905 385
-1110 123 -61 216 -82 364 -83 138 -1 206 10 321 54 183 70 341 215 433 396
14 29 26 54 26 57 0 7 -81 23 -272 56 -229 39 -238 41 -238 50 0 13 29 20 84
20 108 0 571 -75 886 -144 157 -35 290 -55 390 -59 65 -2 77 -24 36 -62 -27
-25 -30 -35 -20 -73 12 -45 48 -52 252 -52 186 0 189 0 211 24 33 35 38 94 11
128 -20 27 -26 28 -108 29 -132 2 -141 5 -177 69 -17 30 -51 84 -74 120 -24
36 -56 92 -71 125 -33 74 -49 88 -105 89 -52 1 -91 -30 -101 -79 -8 -44 14
-83 76 -135 28 -24 48 -46 43 -51 -14 -12 -111 9 -143 31 -80 57 -84 186 -8
257 66 62 199 60 261 -5 39 -40 59 -96 52 -145 -7 -51 9 -84 52 -110 43 -25
66 -11 83 47 23 84 -9 206 -74 283 -15 18 -53 44 -84 59 -68 33 -117 35 -412
16 -215 -13 -1050 -17 -1050 -4 0 8 40 44 269 240 84 73 157 132 162 132 11 0
84 -112 119 -180 13 -25 31 -70 41 -100 l17 -55 108 3 c59 1 110 5 113 7 7 7
-47 141 -93 230 -22 44 -64 111 -93 150 -29 38 -53 72 -53 76 0 11 57 57 195
161 154 115 194 143 199 137 2 -2 27 -85 56 -184 28 -99 76 -263 106 -363 30
-101 54 -185 54 -185 0 -1 57 -2 128 -2 114 0 132 -2 172 -24 25 -13 55 -33
68 -44 19 -18 24 -19 36 -6 7 8 115 142 239 299 124 157 288 362 364 456 76
94 183 228 237 298 93 118 116 141 116 115 0 -20 143 -404 202 -544 61 -143
261 -554 320 -657 32 -55 34 -83 3 -58 -22 18 -35 2 -42 -49 -7 -53 10 -94 59
-135 78 -68 173 -67 248 0 113 102 56 281 -102 319 -20 5 -27 3 -30 -11 -4
-21 -20 18 -131 301 -100 254 -146 381 -229 625 -75 223 -268 831 -268 846 0
5 20 20 45 33 63 33 115 93 115 131 0 35 -39 81 -67 79 -10 0 -43 -11 -73 -24z
m-360 -801 c0 -3 -145 -188 -323 -412 -177 -224 -369 -467 -426 -539 -59 -76
-111 -133 -121 -133 -13 0 -37 71 -118 354 -56 195 -102 361 -102 368 0 10
135 59 418 151 229 76 471 155 537 177 125 41 135 44 135 34z m-2170 -289 c0
-8 -5 -27 -12 -42 -7 -15 -12 -29 -13 -30 0 -1 -34 7 -75 17 -260 67 -518 40
-755 -78 -38 -19 -72 -36 -73 -37 -5 -5 87 -173 98 -180 5 -3 50 15 99 40 142
71 221 89 381 89 142 0 205 -11 326 -59 95 -37 239 -127 232 -144 -4 -9 -197
-185 -399 -363 -157 -139 -168 -147 -200 -142 -46 8 -97 -27 -126 -86 -46 -90
-17 -175 76 -222 50 -25 65 -28 164 -28 119 0 128 -6 67 -48 -72 -49 -163 -53
-259 -11 -101 43 -158 140 -149 252 11 138 102 226 236 230 l60 2 138 120 c76
66 176 156 222 199 98 93 102 82 -53 157 -132 63 -233 84 -375 76 -65 -4 -132
-14 -175 -28 -72 -22 -205 -84 -205 -96 0 -3 50 -99 110 -213 61 -113 110
-212 110 -219 0 -31 -30 4 -110 130 -214 335 -418 698 -404 720 3 5 243 9 535
9 456 0 529 -2 529 -15z m2490 -185 c0 -4 -28 -29 -63 -53 -79 -56 -206 -190
-249 -263 -32 -53 -48 -67 -48 -40 0 20 93 159 142 212 23 25 77 72 121 105
71 53 97 64 97 39z m-1830 -880 c39 -24 -23 -29 -456 -36 -465 -7 -475 -6
-460 31 5 13 71 15 453 15 263 0 454 -4 463 -10z"/>
<path d="M5759 5763 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/>
<path d="M6807 5810 c-27 -5 -52 -11 -55 -14 -3 -4 1 -27 10 -54 10 -31 20
-46 29 -43 8 2 82 6 165 9 115 3 176 1 253 -12 98 -17 103 -17 134 1 40 24 46
56 15 77 -59 38 -402 61 -551 36z"/>
<path d="M6349 5733 c-13 -16 -12 -17 4 -4 9 7 17 15 17 17 0 8 -8 3 -21 -13z"/>
<path d="M4638 5369 c-57 -45 -109 -87 -116 -94 -11 -10 -7 -25 27 -84 47 -83
126 -278 137 -335 l7 -38 117 3 c65 2 121 7 124 10 8 8 -175 619 -185 619 -5
0 -54 -37 -111 -81z"/>
<path d="M6961 5408 c-47 -4 -87 -11 -90 -13 -7 -8 31 -123 106 -322 l65 -171
46 -7 c90 -13 183 -79 223 -158 66 -128 3 -298 -132 -357 -65 -27 -171 -25
-234 5 -53 26 -110 87 -131 140 -20 54 -16 154 9 205 l17 35 -131 260 c-72
143 -134 261 -138 263 -15 5 -142 -111 -196 -180 -63 -80 -125 -201 -150 -294
-9 -32 -19 -108 -22 -169 -15 -314 149 -613 418 -764 212 -119 511 -134 751
-37 190 77 360 245 438 433 96 229 76 502 -51 716 -89 150 -214 266 -364 338
-141 68 -281 93 -434 77z"/>
<path d="M4125 4993 c-55 -47 -127 -110 -160 -141 l-60 -54 124 6 c68 3 176 6
239 6 l114 0 -6 28 c-15 65 -121 243 -144 242 -4 0 -52 -39 -107 -87z"/>
<path d="M7798 3393 c7 -3 16 -2 19 1 4 3 -2 6 -13 5 -11 0 -14 -3 -6 -6z"/>
</g>
    </svg>
  );
}

// شعار Google الرسمي متعدد الألوان (للاستخدام في زر "المتابعة عبر Google")
function GoogleLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.580z"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DATA — أحياء حقيقية بالخرطوم الكبرى (الخرطوم/أمدرمان/بحري)، سائقون، طلبات، تسعير
// ══════════════════════════════════════════════════════════════════════════════
const NEIGHBORHOODS = [
  { name:"السوق العربي",   lat:15.592, lng:32.532 },
  { name:"الخرطوم 2",      lat:15.578, lng:32.535 },
  { name:"العمارات",       lat:15.556, lng:32.548 },
  { name:"الرياض",         lat:15.548, lng:32.575 },
  { name:"بري",            lat:15.560, lng:32.585 },
  { name:"الطائف",         lat:15.530, lng:32.595 },
  { name:"الأزهري",        lat:15.535, lng:32.550 },
  { name:"أركويت",         lat:15.470, lng:32.560 },
  { name:"المقرن",         lat:15.589, lng:32.573 },
  { name:"الجريف غرب",     lat:15.560, lng:32.560 },
  { name:"كلاكلة",         lat:15.450, lng:32.530 },
  { name:"سوبا",           lat:15.440, lng:32.620 },
  { name:"أمدرمان",        lat:15.644, lng:32.478 },
  { name:"الثورة",         lat:15.630, lng:32.460 },
  { name:"الملازمين",      lat:15.660, lng:32.490 },
  { name:"أبو روف",        lat:15.635, lng:32.495 },
  { name:"الموردة",        lat:15.625, lng:32.505 },
  { name:"ود نوباوي",      lat:15.615, lng:32.470 },
  { name:"بحري",           lat:15.617, lng:32.533 },
  { name:"المنشية",        lat:15.585, lng:32.533 },
  { name:"الكدرو",         lat:15.660, lng:32.560 },
  { name:"الحلفايا",       lat:15.650, lng:32.540 },
  { name:"شرق النيل",      lat:15.620, lng:32.610 },
  { name:"الحاج يوسف",     lat:15.650, lng:32.580 },
  { name:"كافوري",         lat:15.600, lng:32.570 },
];

const PRICING = { km: 12, min: 20 }; // سعر الكيلومتر والحد الأدنى للطلب

// الدفع عند الاستلام هو الطريقة الوحيدة المتاحة حالياً — لا خيارات بنكية بعد الآن
const PAYMENT_METHODS = [
  { id:"cash", label:"الدفع عند الاستلام", desc:"نقداً لليد عند التسليم", Icon:Wallet },
];

// مركز الخريطة الافتراضي (الخرطوم) — يُستخدم فقط قبل ورود أول إحداثية GPS حقيقية
const DEFAULT_CENTER = { lat: 15.5007, lng: 32.5599 };

// ── حالة عرض موحّدة لكل شارات الطلبات/السائقين ────────────────────────────────
const ST = {
  pending:    { label:"قيد الانتظار",  dot:"bg-amber-400",  text:"text-amber-700",  bg:"bg-amber-50"  },
  in_transit: { label:"جاري التوصيل",  dot:"bg-blue-500",   text:"text-blue-700",   bg:"bg-blue-50"   },
  delivered:  { label:"تم التوصيل",   dot:"bg-green-500",  text:"text-green-700",  bg:"bg-green-50"  },
  cancelled:  { label:"ملغي",         dot:"bg-red-400",    text:"text-red-700",    bg:"bg-red-50"    },
  available:  { label:"متاح",         dot:"bg-green-500",  text:"text-green-700",  bg:"bg-green-50"  },
  busy:       { label:"مشغول",        dot:"bg-blue-500",   text:"text-blue-700",   bg:"bg-blue-50"   },
  offline:    { label:"غير متصل",     dot:"bg-gray-400",   text:"text-gray-500",   bg:"bg-gray-100"  },
};

// ── دوال مساعدة: تحديد الموقع الجغرافي، حساب المسافة، والتسعير الحي ───────────
function resolveNeighborhood(name) {
  if (!name) return NEIGHBORHOODS[0];
  const trimmed = String(name).trim();
  const exact = NEIGHBORHOODS.find(n => n.name === trimmed);
  if (exact) return exact;
  const partial = NEIGHBORHOODS.find(n => trimmed.includes(n.name) || n.name.includes(trimmed));
  if (partial) return partial;
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) hash = (hash * 31 + trimmed.charCodeAt(i)) >>> 0;
  const latOffset = ((hash % 1000) / 1000 - 0.5) * 0.18;
  const lngOffset = (((hash >> 8) % 1000) / 1000 - 0.5) * 0.18;
  return { name: trimmed, lat: 15.55 + latOffset, lng: 32.53 + lngOffset };
}

function haversineKm(a, b) {
  if (!a || !b) return 0;
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180, lat2 = b.lat * Math.PI / 180;
  const h = Math.sin(dLat/2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function getPricingSettings() {
  return PRICING;
}

function calcDeliveryPrice(distanceKm) {
  const pricing = getPricingSettings();
  const raw = distanceKm * pricing.km;
  return Math.max(Math.round(raw), pricing.min);
}

// ── مقياس قوة كلمة المرور — نقاط 0-4 حسب الطول وتنوع الأحرف ───────────────────
function getPasswordStrength(pw) {
  const value = String(pw || "");
  if (!value) return { score: 0, label: "", pct: 0 };
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^a-zA-Z0-9]/.test(value)) score++;
  const levels = [
    { label:"ضعيفة جداً", color:"#EF4444" },
    { label:"ضعيفة",      color:"#F97316" },
    { label:"متوسطة",     color:"#F59E0B" },
    { label:"قوية",       color:"#22C55E" },
    { label:"قوية جداً",  color:"#16A34A" },
  ];
  const idx = Math.min(score, levels.length - 1);
  return { score: idx, label: levels[idx].label, color: levels[idx].color, pct: ((idx+1)/levels.length)*100 };
}

// إحصاءات السائق من طلباته المرئية له فقط (تسليماته + أرباحه). التقييم لا يُحسب
// هنا بعد الآن — مصدره الوحيد هو profile.ratingAvg المحدَّث عبر معاملة Firestore
// في fbApi.rateOrder، فيبقى نفس الرقم تماماً في كل شاشة يظهر بها لدى السائق والعميل معاً.
function driverStats(driverId, orders) {
  const mine = orders.filter(o => o.driverId === driverId && o.status === "delivered");
  const earnings = mine.reduce((s,o) => s + o.price, 0);
  return { deliveries: mine.length, earnings };
}

function fmtNum(n) { return Number(n || 0).toLocaleString("en-US"); }
function todayISO() { return new Date().toISOString().slice(0,10); } // تاريخ اليوم الفعلي، لا تاريخ عرض ثابت

// تنسيق طابع زمني حقيقي من Firestore (أو تاريخ عادي) إلى صيغة نسبية مقروءة بالعربية
function formatRelativeTime(ts) {
  if (!ts) return "الآن";
  const date = typeof ts.toDate === "function" ? ts.toDate() : new Date(ts);
  const diffSec = Math.max(0, Math.round((Date.now() - date.getTime()) / 1000));
  if (diffSec < 60) return "الآن";
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `قبل ${diffMin} ${diffMin === 1 ? "دقيقة" : "دقائق"}`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `قبل ${diffHr} ${diffHr === 1 ? "ساعة" : "ساعات"}`;
  const diffDay = Math.round(diffHr / 24);
  return `قبل ${diffDay} ${diffDay === 1 ? "يوم" : "أيام"}`;
}

function formatArabicDate(d) {
  try {
    return new Intl.DateTimeFormat("ar", { weekday:"long", day:"numeric", month:"long", year:"numeric", numberingSystem:"latn" }).format(d || new Date());
  } catch (e) { return ""; }
}

// ══════════════════════════════════════════════════════════════════════════════
// UTIL — تخزين محلي (لتفضيلات الجهاز فقط: الوضع الليلي وحالة التنقّل، لا بيانات حسابات)
// ══════════════════════════════════════════════════════════════════════════════
const LS_SETTINGS = "order_app_settings"; // darkMode + lang
const LS_WITHDRAWALS = "order_withdrawals"; // طلبات سحب أرباح السائق — محلية لجهازه فقط، لا علاقة لها بمزامنة العميل/السائق
const SS_NAV      = "order_nav_session";

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}
function writeLS(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
}
function useLocalStorageState(key, initial) {
  const [value, setValue] = useState(() => readLS(key, initial));
  useEffect(() => { writeLS(key, value); }, [key, value]);
  return [value, setValue];
}

function normalizePhone(phone) { return String(phone || "").trim().replace(/[\s-]/g, ""); }

// رقم هاتف سوداني: نخزّنه دوماً بصيغة دولية كاملة +249XXXXXXXXX (249 + 9 أرقام محلية).
// splitSudanPhone تستخرج الأرقام المحلية التسعة من أي صيغة مخزَّنة سابقاً لعرضها
// في الحقل، وtoSudanE164 تعيد بناء الصيغة الدولية الكاملة عند الحفظ.
function splitSudanPhone(stored) {
  const digits = String(stored || "").replace(/\D/g, "");
  if (digits.startsWith("249") && digits.length >= 12) return digits.slice(-9);
  if (digits.length === 10 && digits.startsWith("0")) return digits.slice(1);
  return digits.slice(-9);
}
function toSudanE164(local) {
  return "+249" + String(local || "").replace(/\D/g, "").slice(0, 9);
}

// ══════════════════════════════════════════════════════════════════════════════
// طبقة البيانات الحقيقية — Firebase Auth + Firestore + Storage. لا محاكاة ولا
// تخزين محلي للحسابات/الطلبات بعد الآن: كل حساب، كل طلب، وكل موقع سائق حي يعيش
// في Firestore فعلياً ويُقرأ لحظياً عبر onSnapshot من كل من العميل والسائق معاً.
//
// المصادقة: اسم المستخدم أو حساب Google هو ما يستخدمه الشخص، لكن Firebase Auth
// الحقيقي يحتاج بريداً. نبني بريداً اصطناعياً ثابتاً من (المعرّف + الدور) فنحصل
// على أمان Firebase Auth الفعلي (تشفير، جلسات، حماية من محاولات الدخول المتكررة)
// خلف واجهة "اسم مستخدم + كلمة مرور" أو زر Google تماماً. كل (معرّف + دور) هو
// حساب Firebase Auth مستقل تماماً: يمكن لنفس الشخص أن يملك حساب عميل وحساب سائق
// منفصلين بنفس اسم المستخدم أو بنفس حساب Google — تماماً كتصميم التطبيق الأصلي
// بالبريد الإلكتروني. الاسم ورقم الهاتف والصورة تبقى بيانات تواصل عادية على
// الحساب لا علاقة لها بتسجيل الدخول نفسه.
function usernameToAuthEmail(username, role) {
  const sanitized = String(username || "").trim().toLowerCase().replace(/[^a-z0-9_.]/g, "");
  return role + "-u-" + sanitized + "@order-org.app";
}
function googleAuthEmail(googleUid, role) {
  return role + "-g-" + String(googleUid || "").toLowerCase() + "@order-org.app";
}
// نشتق كلمة مرور فريدة لكل (حساب Google + دور) من معرّف Google الحقيقي المُتحقَّق
// منه عبر نافذة Google نفسها — لا يراها المستخدم ولا يحتاج تذكّرها؛ فقط من نجح
// فعلياً في الدخول بحساب Google الصحيح يمكنه اشتقاقها، فيبقى الأمان بيد Google.
async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

const usersCol  = fbDb.collection("users");
const ordersCol = fbDb.collection("orders");
const notifsCol = fbDb.collection("notifications");
const SERVER_TIME = () => firebase.firestore.FieldValue.serverTimestamp();

// سباق مع مهلة زمنية — أي وعد لا يستقر خلال ms يُرفض بدلاً من أن يُعلَّق للأبد
// (خاصة رفع الصور: لو Storage غير مفعَّل أو حافلته غير موجودة في المشروع، بعض
// المتصفحات تُعلّق الطلب بلا استجابة نظيفة بدل رفضه فوراً بخطأ واضح)
function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms)),
  ]);
}

async function uploadAvatar(uid, file) {
  if (!file) return null;
  const ref = fbStorage.ref().child("avatars/" + uid);
  await withTimeout(ref.put(file), 20000, "رفع الصورة استغرق وقتاً طويلاً");
  return ref.getDownloadURL();
}

function usernameAuthErrorMessage(e) {
  const code = e && e.code;
  if (code === "auth/wrong-password" || code === "auth/invalid-credential") return "اسم المستخدم موجود، لكن كلمة المرور غير صحيحة";
  if (code === "auth/weak-password") return "كلمة المرور ضعيفة جداً، استخدم 6 أحرف على الأقل";
  if (code === "auth/too-many-requests") return "محاولات كثيرة ومتتالية، حاول لاحقاً";
  if (code === "auth/network-request-failed") return "تعذّر الاتصال بالخادم، تحقّق من اتصالك بالإنترنت";
  if (code === "auth/invalid-email") return "اسم المستخدم يحتوي على رموز غير مسموحة";
  return (e && e.message) || "حدث خطأ غير متوقع، حاول مرة أخرى";
}

function googleAuthErrorMessage(e) {
  const code = e && e.code;
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") return null; // أغلق المستخدم النافذة بنفسه، لا داعي لرسالة خطأ
  if (code === "auth/popup-blocked") return "المتصفح منع النافذة المنبثقة، فعّل النوافذ المنبثقة لهذا الموقع وحاول من جديد";
  if (code === "auth/unauthorized-domain") return "هذا النطاق غير مُصرَّح له بتسجيل الدخول عبر Google بعد";
  if (code === "auth/operation-not-allowed") return "تسجيل الدخول عبر Google غير مُفعَّل بعد لهذا التطبيق";
  if (code === "auth/network-request-failed") return "تعذّر الاتصال بالخادم، تحقّق من اتصالك بالإنترنت";
  return (e && e.message) || "تعذّر تسجيل الدخول عبر Google، حاول مرة أخرى";
}

const FIRESTORE_SETUP_ERR = "تعذّر الوصول لقاعدة البيانات — تحقّق من إنشاء Firestore ونشر قواعده في Firebase Console، ومن اتصالك بالإنترنت";

function blankProfile({ uid, role, authMethod, authEmail, extra }) {
  return {
    uid, role, authMethod, authEmail,
    username: null, googleUid: null, email: null,
    name: "", phone: "", photoURL: null, profileComplete: false,
    notificationsEnabled: true, createdAt: SERVER_TIME(),
    ...(role === "driver" ? { online: false, location: null } : {}),
    ...extra,
  };
}

const fbApi = {
  // اسم مستخدم + كلمة مرور: نحاول إنشاء الحساب أولاً؛ فإن كان الاسم مستخدَماً
  // بالفعل (auth/email-already-in-use على البريد الاصطناعي) نجرّب تسجيل الدخول
  // بنفس كلمة المرور تلقائياً — فيتحقق هذا وحده من "موجود؟ سجّل دخول. جديد؟ أنشئ".
  async continueWithUsername({ role, username, password }) {
    const uname = String(username || "").trim().toLowerCase();
    const authEmail = usernameToAuthEmail(uname, role);
    let cred, isNew = false;
    try { cred = await fbAuth.createUserWithEmailAndPassword(authEmail, password); isNew = true; }
    catch (e) {
      if (e.code === "auth/email-already-in-use") {
        try { cred = await fbAuth.signInWithEmailAndPassword(authEmail, password); }
        catch (e2) { throw new Error(usernameAuthErrorMessage(e2)); }
      } else {
        throw new Error(usernameAuthErrorMessage(e));
      }
    }
    const uid = cred.user.uid;
    if (isNew) {
      const profile = blankProfile({ uid, role, authMethod: "username", authEmail, extra: { username: uname } });
      try { await usersCol.doc(uid).set(profile); }
      catch (e) { throw new Error(FIRESTORE_SETUP_ERR); }
      return { ...profile, id: uid, createdAt: new Date().toISOString() };
    }
    let snap;
    try { snap = await usersCol.doc(uid).get(); }
    catch (e) { throw new Error(FIRESTORE_SETUP_ERR); }
    if (!snap.exists) { await fbAuth.signOut(); throw new Error("تعذّر العثور على بيانات هذا الحساب"); }
    return { ...snap.data(), id: uid };
  },

  // المتابعة عبر Google: نافذة Google الحقيقية تتحقق من الهوية، ثم نشتق منها حساب
  // Firebase Auth خاصاً بهذا الدور بكلمة مرور داخلية لا يراها أحد (sha256Hex أعلاه)
  // فيبقى فصل حسابَي العميل/السائق قائماً تماماً كما مع اسم المستخدم. ترجع null
  // بصمت لو أغلق المستخدم النافذة بنفسه (ليست حالة خطأ تستحق رسالة حمراء).
  async continueWithGoogle({ role }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    let googleResult;
    try { googleResult = await fbAuth.signInWithPopup(provider); }
    catch (e) {
      const msg = googleAuthErrorMessage(e);
      if (!msg) return null;
      throw new Error(msg);
    }
    const googleUid = googleResult.user.uid;
    const googleEmail = (googleResult.user.email || "").toLowerCase();
    const googleName = googleResult.user.displayName || "";
    const googlePhoto = googleResult.user.photoURL || null;
    try { await fbAuth.signOut(); } catch (e) {}

    const authEmail = googleAuthEmail(googleUid, role);
    const derivedPass = await sha256Hex(googleUid + ":" + role + ":order-org-google-v1");
    let cred, isNew = false;
    try { cred = await fbAuth.createUserWithEmailAndPassword(authEmail, derivedPass); isNew = true; }
    catch (e) {
      if (e.code === "auth/email-already-in-use") {
        try { cred = await fbAuth.signInWithEmailAndPassword(authEmail, derivedPass); }
        catch (e2) { throw new Error("تعذّر الدخول بحساب Google، حاول مرة أخرى"); }
      } else {
        throw new Error(googleAuthErrorMessage(e) || "تعذّر الدخول عبر Google، حاول مرة أخرى");
      }
    }
    const uid = cred.user.uid;
    if (isNew) {
      const profile = blankProfile({
        uid, role, authMethod: "google", authEmail,
        extra: { googleUid, email: googleEmail || null, name: googleName, photoURL: googlePhoto },
      });
      try { await usersCol.doc(uid).set(profile); }
      catch (e) { throw new Error(FIRESTORE_SETUP_ERR); }
      return { ...profile, id: uid, createdAt: new Date().toISOString() };
    }
    let snap;
    try { snap = await usersCol.doc(uid).get(); }
    catch (e) { throw new Error(FIRESTORE_SETUP_ERR); }
    if (!snap.exists) { await fbAuth.signOut(); throw new Error("تعذّر العثور على بيانات هذا الحساب"); }
    return { ...snap.data(), id: uid };
  },

  // حفظ البيانات الإجبارية بعد أول دخول (الاسم + الهاتف + الصورة) — تُنهي هذه
  // الخطوة profileComplete فيدخل المستخدم التطبيق. فشل رفع الصورة تحديداً
  // (مهلة/Storage) لا يوقف حفظ بقية البيانات أبداً؛ نُعلم الواجهة بذلك عبر
  // photoUploadFailed لتنبيه المستخدم بلطف بدل تعليقه.
  async completeProfile(uid, { name, phone, photoFile }) {
    let photoURL = null;
    let photoUploadFailed = false;
    if (photoFile) {
      try { photoURL = await uploadAvatar(uid, photoFile); }
      catch (e) { photoUploadFailed = true; }
    }
    const patch = {
      name: String(name || "").trim(), phone, profileComplete: true,
      ...(photoURL ? { photoURL } : {}),
    };
    try { await usersCol.doc(uid).set(patch, { merge: true }); }
    catch (e) { throw new Error(FIRESTORE_SETUP_ERR); }
    const snap = await usersCol.doc(uid).get();
    return { ...snap.data(), id: uid, photoUploadFailed };
  },

  async logout() { await fbAuth.signOut(); },

  async updateAccount(uid, patch) {
    const clean = { ...patch };
    if ("photoFile" in clean) {
      const file = clean.photoFile; delete clean.photoFile;
      if (file) clean.photoURL = await uploadAvatar(uid, file);
    }
    await usersCol.doc(uid).set(clean, { merge: true });
    const snap = await usersCol.doc(uid).get();
    return { ...snap.data(), id: uid };
  },

  // تغيير كلمة المرور — متاح فقط لحسابات اسم المستخدم. authEmail المخزَّن على
  // الحساب هو ذات البريد الاصطناعي المستخدَم فعلياً في تسجيل الدخول لهذا الحساب.
  async changePassword(uid, authEmail, currentPassword, newPassword) {
    const user = fbAuth.currentUser;
    if (!user) throw new Error("انتهت الجلسة، سجّل الدخول من جديد");
    const cred = firebase.auth.EmailAuthProvider.credential(authEmail, currentPassword);
    try { await user.reauthenticateWithCredential(cred); }
    catch (e) { throw new Error("كلمة المرور الحالية غير صحيحة"); }
    await user.updatePassword(newPassword);
  },

  async deleteAccount(uid) {
    try { await usersCol.doc(uid).delete(); } catch (e) {}
    const user = fbAuth.currentUser;
    if (!user) return;
    try { await user.delete(); }
    catch (e) {
      if (e.code === "auth/requires-recent-login") throw new Error("لأسباب أمنية، سجّل الخروج ثم أعد الدخول قبل حذف الحساب");
      throw e;
    }
  },

  async findByUsername(role, username) {
    const uname = String(username || "").trim().toLowerCase();
    const snap = await usersCol.where("role", "==", role).where("username", "==", uname).limit(1).get();
    if (snap.empty) return null;
    return { ...snap.docs[0].data(), id: snap.docs[0].id };
  },

  async findByGoogleUid(role, googleUid) {
    const snap = await usersCol.where("role", "==", role).where("googleUid", "==", googleUid).limit(1).get();
    if (snap.empty) return null;
    return { ...snap.docs[0].data(), id: snap.docs[0].id };
  },

  // إنشاء طلب — يبدأ "قيد الانتظار" بلا استثناء، بلا أي إسناد عشوائي فوري.
  // أي سائق متصل يرى الطلب في قائمته الحيّة ويقبله بنفسه عبر acceptOrder.
  async createOrder(orderData) {
    const ref = ordersCol.doc();
    const full = { ...orderData, id: ref.id, status: "pending", driverId: null, driver: null, phase: null, createdAt: SERVER_TIME() };
    await ref.set(full);
    return full;
  },

  // قبول طلب — محمي بمعاملة Firestore حقيقية (transaction): تضمن رياضياً استحالة
  // إسناد نفس الطلب لسائقين مختلفين حتى لو ضغطا "قبول" في نفس الجزء من الثانية.
  async acceptOrder(orderId, driverUid, driverName) {
    const ref = ordersCol.doc(orderId);
    await fbDb.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new Error("هذا الطلب لم يعد متاحاً");
      const data = snap.data();
      if (data.status !== "pending" || data.driverId) throw new Error("تم إسناد هذا الطلب لسائق آخر للتو");
      tx.update(ref, { status: "in_transit", phase: "to_pickup", driverId: driverUid, driver: driverName, acceptedAt: SERVER_TIME() });
    });
  },

  async updateOrder(orderId, patch) { await ordersCol.doc(orderId).set(patch, { merge: true }); },

  // تقييم السائق بعد التسليم — يحدّث متوسط تقييمه (ratingAvg) على ملفه الحقيقي عبر
  // معاملة Firestore، فيقرأه العميل والسائق كلاهما من نفس المكان دوماً (لا حساب
  // مضاعف من قوائم طلبات منفصلة قد تختلف بحسب من يملك صلاحية رؤيتها)
  async rateOrder(orderId, driverId, value) {
    await ordersCol.doc(orderId).set({ rating: value }, { merge: true });
    if (!driverId) return;
    const ref = usersCol.doc(driverId);
    await fbDb.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const d = snap.data() || {};
      const count = (d.ratingCount || 0) + 1;
      const avg = ((d.ratingAvg != null ? d.ratingAvg : 5) * (d.ratingCount || 0) + value) / count;
      tx.update(ref, { ratingAvg: Math.round(avg * 10) / 10, ratingCount: count });
    });
  },

  async pushNotification(recipientId, title, body) {
    if (!recipientId) return;
    await notifsCol.add({ recipientId, title, body, read: false, createdAt: SERVER_TIME() });
  },

  async markAllNotificationsRead(uid) {
    const snap = await notifsCol.where("recipientId", "==", uid).where("read", "==", false).get();
    if (snap.empty) return;
    const batch = fbDb.batch();
    snap.docs.forEach(d => batch.update(d.ref, { read: true }));
    await batch.commit();
  },

  // بث الموقع الحي للسائق — تُستدعى من مراقب GPS في DriverApp (مُقيَّد زمنياً/مسافياً هناك)
  async updateDriverLocation(uid, coords) { await usersCol.doc(uid).set({ location: coords }, { merge: true }); },
};

// ── حساب تقدّم الرحلة الحقيقي من الموقع الحي + طور الرحلة، بلا أي عدّاد وهمي ──
// يُستدعى بنفس الصيغة تماماً من شاشة العميل وشاشة السائق فتُعطي نفس الرقم دوماً؛
// لا يوجد أي كتابة لـ progress في Firestore — إنه دوماً قيمة مُشتقّة حيّة.
const AVG_SPEED_KMH = 28; // متوسط سرعة موتوسيكل التوصيل داخل المدينة
function computeOrderProgress(order, driverLoc) {
  if (!order) return { progress: 0, remainingKm: null, etaMin: null, hasLiveLocation: false };
  if (order.status === "delivered") return { progress: 1, remainingKm: 0, etaMin: 0, hasLiveLocation: false };
  if (order.status !== "in_transit") return { progress: 0, remainingKm: null, etaMin: null, hasLiveLocation: false };

  const pickup = order.pickupLoc;
  const dropoff = order.dropoffLoc;
  if (!pickup || !dropoff) return { progress: 0, remainingKm: null, etaMin: null, hasLiveLocation: !!driverLoc };

  if (order.phase === "to_dropoff") {
    const legKm = Math.max(haversineKm(pickup, dropoff), 0.3);
    const remainingKm = driverLoc ? haversineKm(driverLoc, dropoff) : legKm;
    const covered = Math.max(0, Math.min(1, 1 - remainingKm / legKm));
    const progress = TL_PICKUP_AT + (1 - TL_PICKUP_AT) * covered;
    return { progress: Math.min(progress, 0.99), remainingKm, etaMin: Math.max(1, Math.round(remainingKm / AVG_SPEED_KMH * 60)), hasLiveLocation: !!driverLoc };
  }
  const remainingKm = driverLoc ? haversineKm(driverLoc, pickup) : null;
  return { progress: TL_PICKUP_AT * 0.5, remainingKm, etaMin: remainingKm != null ? Math.max(1, Math.round(remainingKm / AVG_SPEED_KMH * 60)) : null, hasLiveLocation: !!driverLoc };
}

// ── قفل تمرير الخلفية أثناء ظهور أي نافذة منبثقة (بلا أي إزاحة للشاشة) ────────
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

// ── قاموس الترجمة (واجهة التطبيق الأساسية) ─────────────────────────────────────
const DICT = {
  welcome_tagline: "توصيل فوري • بالموتوسيكل",
  choose_account: "اختر نوع حسابك",
  role_customer_title: "عميل", role_customer_desc: "اطلب توصيل وتتبع طلبك لحظة بلحظة",
  role_driver_title: "سائق", role_driver_desc: "استقبل الطلبات واكسب يومياً",
  back: "رجوع", login_title: "تسجيل الدخول", account_of: "حساب",
  password_label: "كلمة المرور",
  continue_btn: "متابعة", continuing: "جارٍ المتابعة...",
  username_label: "اسم المستخدم",
  err_pass_required: "الرجاء إدخال كلمة المرور",
  err_pass_short: "كلمة المرور يجب أن تكون 6 أحرف على الأقل",
  err_username_required: "الرجاء إدخال اسم المستخدم",
  err_username_short: "اسم المستخدم 3 أحرف على الأقل",
  err_username_invalid: "أحرف إنجليزية وأرقام فقط، بلا مسافات",
  username_flow_hint: "إذا كان اسم المستخدم مسجَّلاً من قبل سنسجّل دخولك مباشرة، وإن كان جديداً سننشئ لك حساباً به تلقائياً",
  google_continue_btn: "المتابعة عبر Google",
  or_divider: "أو",
  err_name_required: "الرجاء إدخال الاسم الكامل",
  err_name_short: "الاسم يجب أن يكون حرفين على الأقل",
  err_phone_required: "الرجاء إدخال رقم الهاتف",
  err_phone_invalid: "رقم الهاتف غير صحيح، أدخل 9 أرقام",
  phone_label: "رقم الهاتف",
  photo_label: "صورتك الشخصية",
  photo_hint: "اضغط لإضافة صورتك",
  err_photo_required: "الرجاء إضافة صورة شخصية",
  complete_profile_title: "أكمل بياناتك",
  complete_profile_sub: "خطوة أخيرة قبل البدء",
  saving_profile: "جارٍ الحفظ...",
  nav_orders: "الطلبات", nav_settings: "الإعدادات",
  nav_home: "الرئيسية", nav_history: "طلباتي", nav_profile: "حسابي", nav_earnings: "أرباحي",
  search_ph_orders: "ابحث برقم الطلب، العميل، العنوان...",
  no_results_title: "لا توجد نتائج",
  no_results_orders: "لم نجد أي طلبات مطابقة لبحثك",
  no_pending_orders_title: "لا توجد طلبات متاحة",
  no_pending_orders_sub: "سنعلمك فور توفر طلب جديد في منطقتك",
  no_history_title: "لا يوجد طلبات بعد",
  no_history_sub: "طلباتك السابقة ستظهر هنا",
  clear_search: "مسح البحث",
  settings_title: "الإعدادات", personal_info: "المعلومات الشخصية", full_name: "الاسم الكامل",
  phone_number: "رقم الهاتف", preferences: "التفضيلات", notifications_label: "الإشعارات",
  dark_mode_label: "الوضع الليلي", save_changes: "حفظ التغييرات",
  saved_success: "تم الحفظ بنجاح", saving: "جارٍ الحفظ...",
  notifications_title: "الإشعارات", mark_all_read: "تحديد الكل كمقروء",
  no_notifications_title: "لا توجد إشعارات", no_notifications_sub: "ستظهر تنبيهاتك هنا أولاً بأول",
};

const AppCtx = React.createContext(null);
function useApp() { return React.useContext(AppCtx); }


// ── مؤشر تحميل ────────────────────────────────────────────────────────────────
function Spinner({ dark }) {
  return <span className={`moter-spinner ${dark?"moter-spinner-dark":""}`} role="status" aria-label="جارٍ التحميل"/>;
}

// ── حالة فارغة موحّدة ─────────────────────────────────────────────────────────
function EmptyState({ Icon = Inbox, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon size={26} className="text-gray-400" strokeWidth={1.6}/>
      </div>
      <p className="font-black text-gray-950 text-base mb-1">{title}</p>
      {subtitle && <p className="text-gray-400 text-sm max-w-[240px]">{subtitle}</p>}
      {action}
    </div>
  );
}

// ── هياكل تحميل (Skeleton) ────────────────────────────────────────────────────
function SkeletonLine({ w = "100%", h = 14 }) {
  return <div className="moter-skeleton" style={{ width:w, height:h }}/>;
}
function SkeletonCard() {
  return (
    <div className="bg-white border rounded-2xl p-4" style={{borderColor:"var(--bc-a)"}}>
      <div className="flex justify-between items-center mb-3"><SkeletonLine w={72} h={12}/><SkeletonLine w={54} h={20}/></div>
      <SkeletonLine w="78%" h={14}/>
      <div className="mt-2"><SkeletonLine w="52%" h={12}/></div>
    </div>
  );
}
function SkeletonList({ count = 3 }) {
  return <div className="space-y-3">{Array.from({ length: count }).map((_, i) => <SkeletonCard key={i}/>)}</div>;
}

// ── نجوم تقييم للعرض فقط ──────────────────────────────────────────────────────
function RatingStars({ value = 0, size = 12, showValue = true }) {
  const rounded = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1">
      <span className="inline-flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={size} className={i <= rounded ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}/>
        ))}
      </span>
      {showValue && <span className="text-gray-500 font-bold text-xs">{Number(value).toFixed(1)}</span>}
    </span>
  );
}

// ── مخطط أعمدة بسيط قابل لإعادة الاستخدام (أرباح/طلبات) ───────────────────────
function MiniBarChart({ labels, values, highlightIndex = -1 }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex items-end gap-2" style={{ height:112 }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="w-full flex flex-col justify-end" style={{ height:96 }}>
            <div className={`w-full rounded-t-lg transition-all ${i===highlightIndex ? "bg-gray-950" : "bg-gray-100"}`}
              style={{ height: max>0 ? `${(v/max)*90}%` : "4px", minHeight: v>0?8:4 }}/>
          </div>
          <span className="text-xs text-gray-400 font-medium">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ── مخطط دائري بسيط (توزيع حالات الطلبات) ─────────────────────────────────────
// ── لوحة الإشعارات (قابلة للاستدعاء من أي مكان) ────────────────────────────────
// ── صفحة الإشعارات — مستقلة بالكامل، تُفتح بالتنقل إليها لا كنافذة منبثقة ──────
function NotificationsScreen({ setView, backTo = "home" }) {
  const { notifications, markAllRead, t } = useApp();
  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <div className="bg-gray-950 text-white p-6 pt-14 flex items-center gap-3">
        <button onClick={()=>setView(backTo)} aria-label={t("back")} className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/>
        </button>
        <h2 className="text-xl font-black">{t("notifications_title")}</h2>
      </div>
      <div className="flex-1 overflow-auto">
        {notifications.length === 0 ? (
          <EmptyState Icon={Bell} title={t("no_notifications_title")} subtitle={t("no_notifications_sub")}/>
        ) : notifications.map(n => (
          <div key={n.id} className="p-4 border-b flex items-start gap-3" style={{borderColor:"var(--bc-c)"}}>
            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.read?"bg-transparent":"bg-blue-500"}`}/>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-950 text-sm">{n.title}</p>
              <p className="text-gray-500 text-sm mt-0.5">{n.body}</p>
              <p className="text-gray-300 text-xs mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      {notifications.length > 0 && (
        <button onClick={markAllRead} className="w-full p-4 text-center font-bold text-sm text-gray-700 active:bg-gray-50 border-t" style={{borderColor:"var(--bc-c)"}}>
          {t("mark_all_read")}
        </button>
      )}
    </div>
  );
}

// ── جرس الإشعارات — زر تنقّل بسيط فقط، الصفحة نفسها مستقلة تماماً ──────────────
function NotificationBell({ variant = "dark", onOpen }) {
  const { notifications, t } = useApp();
  const unread = notifications.filter(n => !n.read).length;
  const btnCls = variant === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-700";
  return (
    <div className="relative">
      <button onClick={onOpen} aria-label={t("notifications_title")} className={`w-10 h-10 rounded-xl flex items-center justify-center ${btnCls}`}>
        <Bell size={18}/>
      </button>
      {unread > 0 && (
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold" aria-hidden="true">
          {unread}
        </span>
      )}
    </div>
  );
}

// ── نظام تنبيهات Toast خفيفة (نجاح/خطأ) ───────────────────────────────────────
function ToastHost({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-24 inset-x-0 z-[70] flex flex-col items-center gap-2 px-4 pointer-events-none" style={{ maxWidth:480, margin:"0 auto" }}>
      {toasts.map(ts => (
        <div key={ts.id} className={`moter-toast pointer-events-auto max-w-full px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2 text-sm font-bold ${ts.type==="error" ? "bg-red-500 text-white" : "bg-gray-950 text-white"}`}>
          {ts.type==="error" ? <AlertCircle size={16} className="flex-shrink-0"/> : <CheckCircle size={16} className="flex-shrink-0"/>}
          <span className="truncate">{ts.message}</span>
        </div>
      ))}
    </div>
  );
}

// ── سبلاش الشاشة الأولية ──────────────────────────────────────────────────────
function SplashScreen({ exiting }) {
  return (
    <div className={`moter-splash ${exiting ? "moter-splash-exit" : ""}`}>
      <div className={`w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-4 ${exiting ? "moter-splash-icon" : "moter-splash-icon-idle"}`}>
        <AppMark size={38} className="text-gray-950"/>
      </div>
      <h1 className="text-white text-2xl font-black tracking-tight">Order</h1>
    </div>
  );
}

// ── Shared Components ─────────────────────────────────────────────────────────
function Badge({ status }) {
  const s = ST[status] || ST.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.text} ${s.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`}/>
      {s.label}
    </span>
  );
}

// ── نظام تتبّع الطلب بالخط الزمني (Timeline) — موحّد بين واجهتَي العميل والسائق ──
// نفس الخطوات، نفس الترتيب، ونفس منطق الحالة تماماً كما في تطبيقات مثل أمازون؛
// يتغيّر فقط نص كل خطوة بحسب من يشاهدها (role="customer" أو role="driver").
const TIMELINE_STEPS = [
  { key:"placed",    icon:Check,       cLabel:"تم تأكيد الطلب",   dLabel:"طلب جديد مستلم"            },
  { key:"assigned",  icon:UserCheck,   cLabel:"تم إسناد سائق",    dLabel:"تم قبول الطلب"              },
  { key:"pickup",    icon:Package,     cLabel:"استلام الشحنة",    dLabel:"استلام الشحنة من الانطلاق"  },
  { key:"transit",   icon:Bike,        cLabel:"في الطريق إليك",   dLabel:"التوجه لنقطة التسليم"       },
  { key:"delivered", icon:CheckCircle, cLabel:"تم التوصيل",       dLabel:"تسليم الطلب"                },
];
const TL_PICKUP_AT = 0.12; // نسبة تقدّم الرحلة التي تُعتبر عندها الشحنة "مستلمة" من نقطة الانطلاق

// فهرس الخطوة الجارية الآن (0-4)، أو -1 إن كان الطلب ملغياً (لا يُعرض له خط زمني)
function currentTimelineStep(order) {
  if (!order || order.status === "cancelled") return -1;
  if (order.status === "delivered") return 4;
  if (order.status === "pending") return 1;      // تم التأكيد، وجارٍ الآن البحث عن سائق
  return order.phase === "to_dropoff" ? 3 : 2;    // in_transit: استلام الشحنة، أو في الطريق إلى العميل
}

function DeliveryTimeline({ order, role = "customer", eta, variant = "full" }) {
  if (!order || order.status === "cancelled") return null;
  const curIdx = currentTimelineStep(order);
  const isDone = order.status === "delivered";
  const stateOf = (i) => isDone ? "done" : i < curIdx ? "done" : i === curIdx ? "current" : "upcoming";

  if (variant === "compact") {
    const activeLabel = isDone ? "تم التوصيل بنجاح" : (role==="driver" ? TIMELINE_STEPS[curIdx].dLabel : TIMELINE_STEPS[curIdx].cLabel);
    return (
      <div>
        <div className="flex items-center">
          {TIMELINE_STEPS.map((step, i) => {
            const state = stateOf(i);
            const isLast = i === TIMELINE_STEPS.length - 1;
            return (
              <React.Fragment key={step.key}>
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-300 ${state==="upcoming"?"bg-gray-200":"bg-gray-950"} ${state==="current"?"moter-tl-pulse":""}`}/>
                {!isLast && <div className="flex-1 h-0.5 mx-1 rounded-full transition-colors duration-300" style={{background: state==="done" ? "#0A0A0A" : "var(--bc-b)"}}/>}
              </React.Fragment>
            );
          })}
        </div>
        <p className="text-xs font-bold text-gray-950 mt-2 truncate">{activeLabel}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-2xl p-5" style={{borderColor:"var(--bc-a)"}} aria-label="تتبع حالة الطلب">
      {TIMELINE_STEPS.map((step, i) => {
        const state = stateOf(i);
        const label = role === "driver" ? step.dLabel : step.cLabel;
        const Ic = state === "done" ? Check : step.icon;
        const isLast = i === TIMELINE_STEPS.length - 1;
        let caption = "";
        if (state === "current") {
          if (step.key === "assigned") caption = "جارٍ البحث عن أقرب سائق متاح...";
          else if (step.key === "pickup") caption = role==="driver" ? "توجّه الآن لاستلام الشحنة" : "السائق في طريقه لاستلام شحنتك...";
          else if (step.key === "transit") caption = eta ? `الوصول المتوقع خلال ~${eta} دقيقة` : "السائق في الطريق الآن...";
        }
        return (
          <div key={step.key} className={`flex gap-3.5 ${isLast?"":"pb-6"}`}>
            <div className="flex flex-col items-center flex-shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                state==="done" ? "bg-gray-950 text-white" : state==="current" ? "bg-gray-950 text-white moter-tl-pulse" : "bg-gray-100 text-gray-300"}`}>
                <Ic size={15} strokeWidth={2.4}/>
              </div>
              {!isLast && <div className="w-0.5 flex-1 rounded-full transition-colors duration-300" style={{minHeight:24, background: state==="done" ? "#0A0A0A" : "var(--bc-b)"}}/>}
            </div>
            <div className="flex-1 min-w-0 pt-1.5">
              <p className={`font-black text-sm ${state==="upcoming" ? "text-gray-300" : "text-gray-950"}`}>{label}</p>
              {caption && <p className="text-gray-400 text-xs mt-1">{caption}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── شاشة اختيار الموقع على الخريطة — تحل محل الكتابة اليدوية، وتصبح إجبارية
//    قبل تمكين طلب سائق. دبّوس ثابت في منتصف الشاشة والخريطة هي التي تتحرك تحته،
//    مع زر لاستخدام الموقع الحالي عبر GPS الجهاز وعكس ترميز جغرافي حي لاسم المكان. ──
function LocationPickerScreen({ title, initial, centerHint, onConfirm, onCancel }) {
  const { showToast } = useApp();
  useScrollLock(true);
  const mapRef = React.useRef(null);
  const mapInstance = React.useRef(null);
  const [center, setCenter] = useState(initial || centerHint || DEFAULT_CENTER);
  const [label, setLabel] = useState("");
  const [labelLoading, setLabelLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [moving, setMoving] = useState(false);
  const geocodeTimer = React.useRef(null);

  const locateMe = (mapArg) => {
    if (!navigator.geolocation) { showToast("جهازك لا يدعم تحديد الموقع", "error"); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        const map = mapArg || mapInstance.current;
        if (map) map.setView([c.lat, c.lng], 16, { animate:true });
        setCenter(c);
        setLocating(false);
      },
      () => { setLocating(false); showToast("تعذّر تحديد موقعك — تأكد من تفعيل صلاحية الموقع للمتصفح", "error"); },
      { enableHighAccuracy:true, timeout:10000 }
    );
  };

  useEffect(() => {
    if (!mapInstance.current && mapRef.current && window.L) {
      const L = window.L;
      const start = initial || centerHint || DEFAULT_CENTER;
      const map = L.map(mapRef.current, { zoomControl:false }).setView([start.lat, start.lng], initial ? 16 : 13);
      L.control.zoom({ position:"bottomleft" }).addTo(map);
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom:19, attribution:"Esri" }).addTo(map);
      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom:19, opacity:0.92 }).addTo(map);
      map.on("movestart", () => setMoving(true));
      map.on("moveend", () => { setMoving(false); const c = map.getCenter(); setCenter({ lat:c.lat, lng:c.lng }); });
      mapInstance.current = map;
      if (!initial) locateMe(map);
    }
    return () => { if (mapInstance.current) { mapInstance.current.remove(); mapInstance.current = null; } };
  }, []);

  // عكس الترميز الجغرافي لإظهار اسم مقروء للنقطة — Nominatim (OpenStreetMap)، مجاني بلا مفتاح API
  useEffect(() => {
    if (moving) return;
    clearTimeout(geocodeTimer.current);
    setLabelLoading(true);
    geocodeTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${center.lat}&lon=${center.lng}&zoom=16&accept-language=ar`);
        const data = await res.json();
        setLabel(data && data.display_name ? data.display_name : `${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`);
      } catch {
        setLabel(`${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}`);
      } finally {
        setLabelLoading(false);
      }
    }, 700);
    return () => clearTimeout(geocodeTimer.current);
  }, [center.lat, center.lng, moving]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col" dir="rtl">
      <div className="bg-gray-950 text-white p-5 pt-14 flex items-center gap-3 flex-shrink-0">
        <button onClick={onCancel} aria-label="إلغاء" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
          <X size={16}/>
        </button>
        <h2 className="text-lg font-black truncate">{title}</h2>
      </div>

      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0"/>
        <div className={`moter-picker-pin ${moving ? "" : "moter-picker-pin-idle"}`}><div className="moter-pin-active"/></div>
        <button onClick={()=>locateMe()} disabled={locating} type="button"
          className="absolute bottom-5 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform"
          style={{boxShadow:"0 6px 20px rgba(0,0,0,.28)"}} aria-label="استخدم موقعي الحالي">
          {locating ? <Spinner dark/> : <Crosshair size={20} className="text-gray-800"/>}
        </button>
      </div>

      <div className="p-5 border-t flex-shrink-0" style={{borderColor:"var(--bc-a)"}}>
        <div className="flex items-start gap-2 mb-4" style={{minHeight:40}}>
          <MapPin size={16} className="text-red-600 flex-shrink-0 mt-0.5"/>
          {labelLoading ? <SkeletonLine w="85%" h={16}/> : <p className="text-sm font-bold text-gray-800 leading-relaxed">{label}</p>}
        </div>
        <button onClick={()=>onConfirm({ lat:center.lat, lng:center.lng, label: label || `${center.lat.toFixed(5)}, ${center.lng.toFixed(5)}` })}
          disabled={labelLoading}
          className="w-full bg-gray-950 text-white py-4 rounded-xl font-black text-base active:scale-95 transition-transform disabled:opacity-50">
          تأكيد الموقع
        </button>
      </div>
    </div>
  );
}

// ── Welcome Screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onSelect }) {
  const { t, darkMode, setDarkMode, canInstall, promptInstall } = useApp();
  return (
    <div className="min-h-screen bg-white flex flex-col relative" dir="rtl">
      <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
        {canInstall && (
          <button onClick={promptInstall} aria-label="تثبيت التطبيق"
            className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/10 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-transform">
            <Download size={19}/>
          </button>
        )}
        <button onClick={()=>setDarkMode(v=>!v)} aria-label={darkMode ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"} aria-pressed={darkMode}
          className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/10 border border-white/15 text-white backdrop-blur-sm active:scale-90 transition-transform">
          {darkMode ? <Sun size={19}/> : <Moon size={19}/>}
        </button>
      </div>
      <div className="bg-gray-950 text-white flex flex-col items-center justify-center py-16 px-6 hero-surface">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-5 shadow-lg">
          <AppMark size={38} className="text-gray-950"/>
        </div>
        <h1 className="text-4xl font-black tracking-tight">Order</h1>
        <p className="text-gray-400 mt-2 text-sm font-medium">{t("welcome_tagline")}</p>
      </div>

      <div className="flex-1 px-5 py-8 flex flex-col gap-3 role-stagger">
        <p className="text-xs font-bold text-gray-400 text-center uppercase tracking-widest mb-2">{t("choose_account")}</p>
        {[
          { r:"customer", Icon:User, title:t("role_customer_title"), desc:t("role_customer_desc"), dark:true  },
          { r:"driver",   Icon:Bike, title:t("role_driver_title"),   desc:t("role_driver_desc"),    dark:false },
        ].map(({ r, Icon, title, desc, dark }) => (
          <button key={r} onClick={() => onSelect(r)} aria-label={title}
            className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-95 ${dark ? "bg-gray-950 border-gray-950 text-white" : "bg-white border-gray-150 text-gray-950"}`}
            style={!dark ? {borderColor:"var(--bc-b)"} : {}}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${dark ? "bg-white/10" : "bg-gray-100"}`}>
              <Icon size={22} className={dark ? "text-white" : "text-gray-700"}/>
            </div>
            <div className="flex-1 min-w-0 text-right">
              <div className="font-bold text-lg leading-tight">{title}</div>
              <div className={`text-sm mt-0.5 ${dark ? "text-gray-400" : "text-gray-500"}`}>{desc}</div>
            </div>
            <ChevronRight size={18} className={`flex-shrink-0 ${dark ? "text-gray-500" : "text-gray-300"}`} style={{transform:"scaleX(-1)"}}/>
          </button>
        ))}
      </div>
      <p className="text-center text-gray-300 text-xs pb-6">Order للتوصيل © 2026 — v2.0</p>
    </div>
  );
}

// ── حقل هاتف سوداني موحّد (مفتاح +249 ثابت + 9 أرقام محلية) ────────────────────
function SudanPhoneField({ value, onChange, error, label }) {
  return (
    <div>
      {label && <label className="text-sm font-semibold text-gray-700 block mb-2">{label}</label>}
      <div className="flex gap-2" dir="ltr">
        <div className="border-2 rounded-xl px-3.5 flex items-center gap-1.5 flex-shrink-0 font-bold text-gray-500" style={{borderColor:"var(--bc-b)"}}>
          <span>+249</span>
        </div>
        <input type="tel" inputMode="numeric" value={value} onChange={e=>onChange(e.target.value.replace(/\D/g,"").slice(0,9))}
          placeholder="9XXXXXXXX" aria-invalid={!!error} aria-label={label || "رقم الهاتف"}
          className="flex-1 min-w-0 border-2 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none transition-colors"
          style={{borderColor: error ? "#EF4444" : (value?"var(--ink)":"var(--bc-b)")}}/>
      </div>
      {error && <p className="moter-field-error"><AlertCircle size={13}/> {error}</p>}
    </div>
  );
}

// ── مؤشر قوة كلمة المرور — شريط ملوّن + تسمية، يظهر فقط بعد بدء الكتابة ────────
function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const s = getPasswordStrength(password);
  return (
    <div className="mt-2">
      <div className="moter-strength-track"><div className="moter-strength-fill" style={{width:`${s.pct}%`, background:s.color}}/></div>
      <p className="text-xs font-bold mt-1" style={{color:s.color}}>قوة كلمة المرور: {s.label}</p>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
// طريقة دخول واحدة موحّدة: زر Google احترافي، أو اسم مستخدم + كلمة مرور في نموذج
// واحد يكتشف تلقائياً هل هذا دخول لحساب موجود أو إنشاء حساب جديد (fbApi تتولى
// المنطق فعلياً). لا تبويبَي "دخول/تسجيل" منفصلين بعد الآن.
function LoginScreen({ role, onAuthed, onBack, prefillUsername }) {
  const { t } = useApp();
  const meta = { customer:{label:t("role_customer_title"),Icon:User}, driver:{label:t("role_driver_title"),Icon:Bike} };
  const { label, Icon } = meta[role];

  const [username, setUsername] = useState(prefillUsername || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const busy = loading || googleLoading;

  const validate = () => {
    const errs = {};
    const uTrim = username.trim();
    if (!uTrim) errs.username = t("err_username_required");
    else if (uTrim.length < 3) errs.username = t("err_username_short");
    else if (!/^[a-zA-Z0-9_.]+$/.test(uTrim)) errs.username = t("err_username_invalid");
    if (!password) errs.password = t("err_pass_required");
    else if (password.length < 6) errs.password = t("err_pass_short");
    setErrors(errs);
    if (Object.keys(errs).length) setShakeKey(k => k + 1);
    return Object.keys(errs).length === 0;
  };

  const submitUsername = async () => {
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const account = await fbApi.continueWithUsername({ role, username, password });
      onAuthed(account);
    } catch (e) {
      setFormError(e.message || "تعذّر تسجيل الدخول، حاول مرة أخرى");
      setShakeKey(k => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const submitGoogle = async () => {
    setFormError("");
    setGoogleLoading(true);
    try {
      const account = await fbApi.continueWithGoogle({ role });
      if (account) onAuthed(account); // null يعني أن المستخدم أغلق نافذة Google بنفسه
    } catch (e) {
      setFormError(e.message || "تعذّر تسجيل الدخول عبر Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <div className="bg-gray-950 text-white p-6 pt-14">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/> {t("back")}
        </button>
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4">
          <Icon size={20} className="text-gray-950"/>
        </div>
        <h2 className="text-2xl font-black">{t("login_title")}</h2>
        <p className="text-gray-400 text-sm mt-1">{t("account_of")} {label}</p>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-4 mt-2">
        <button onClick={submitGoogle} disabled={busy} type="button"
          className="w-full bg-white border-2 py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-3 active:scale-95 transition-transform disabled:opacity-60"
          style={{borderColor:"var(--bc-b)"}}>
          {googleLoading ? <Spinner dark/> : <GoogleLogo size={20}/>}
          <span className="text-gray-800">{googleLoading ? t("continuing") : t("google_continue_btn")}</span>
        </button>

        <div className="flex items-center gap-3 py-1">
          <div className="flex-1 h-px" style={{background:"var(--bc-b)"}}/>
          <span className="text-gray-400 text-xs font-bold">{t("or_divider")}</span>
          <div className="flex-1 h-px" style={{background:"var(--bc-b)"}}/>
        </div>

        <div key={errors.username ? `u-${shakeKey}` : "u"} className={errors.username ? "moter-shake" : ""}>
          <label className="text-sm font-semibold text-gray-700 block mb-2">{t("username_label")}</label>
          <input type="text" value={username} onChange={e=>setUsername(e.target.value)} dir="ltr"
            aria-invalid={!!errors.username} aria-label={t("username_label")}
            className="w-full border-2 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none transition-colors"
            style={{borderColor: errors.username ? "#EF4444" : (username?"var(--ink)":"var(--bc-b)")}}/>
          {errors.username
            ? <p className="moter-field-error"><AlertCircle size={13}/> {errors.username}</p>
            : <p className="text-gray-400 text-xs mt-1.5">أحرف إنجليزية وأرقام و . _ فقط — 3 أحرف على الأقل</p>}
        </div>

        <div key={errors.password ? `p-${shakeKey}` : "p"} className={errors.password ? "moter-shake" : ""}>
          <label className="text-sm font-semibold text-gray-700 block mb-2">{t("password_label")}</label>
          <div className="relative">
            <input type={showPassword?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)}
              aria-invalid={!!errors.password} aria-label={t("password_label")}
              className="w-full border-2 rounded-xl pl-4 pr-12 py-3.5 text-gray-900 focus:outline-none transition-colors" dir="ltr"
              style={{borderColor: errors.password ? "#EF4444" : (password?"var(--ink)":"var(--bc-b)")}}/>
            <button onClick={()=>setShowPassword(!showPassword)} type="button" aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
          {errors.password
            ? <p className="moter-field-error"><AlertCircle size={13}/> {errors.password}</p>
            : password
              ? <PasswordStrengthMeter password={password}/>
              : <p className="text-gray-400 text-xs mt-1.5">6 أحرف على الأقل</p>}
        </div>

        {formError && <p className="moter-field-error justify-center bg-red-50 rounded-xl px-3 py-2.5"><AlertCircle size={13}/> {formError}</p>}

        <button onClick={submitUsername} disabled={busy}
          className="w-full bg-gray-950 text-white py-4 rounded-xl font-bold text-base mt-1 active:scale-95 transition-transform flex items-center justify-center gap-2">
          {loading && <Spinner/>}
          {loading ? t("continuing") : t("continue_btn")}
        </button>
        <p className="text-center text-gray-400 text-xs leading-relaxed px-2">{t("username_flow_hint")}</p>
      </div>
    </div>
  );
}

// ── شاشة إكمال البيانات الإجبارية ────────────────────────────────────────────
// تظهر بعد أول دخول (Google أو اسم مستخدم) طالما profileComplete لم تُضبط بعد.
// Google لا يمنحنا رقم هاتف أبداً، واسم المستخدم لا يمنحنا اسماً أو صورة — فهذه
// الخطوة هي ما يكمل بيانات الحساب الحقيقية قبل السماح بدخول التطبيق فعلياً.
function CompleteProfileScreen({ account, onDone, onLogout }) {
  const { t, showToast } = useApp();
  const [fullName, setFullName] = useState(account.name || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(account.photoURL || null);
  const [localPhone, setLocalPhone] = useState(splitSudanPhone(account.phone));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const photoInputId = "onboardPhotoInput_" + account.role;

  const handlePhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    const nameTrim = fullName.trim();
    if (!nameTrim) errs.name = t("err_name_required");
    else if (nameTrim.length < 2) errs.name = t("err_name_short");
    const phoneDigits = localPhone.replace(/\D/g, "");
    if (!phoneDigits) errs.phone = t("err_phone_required");
    else if (phoneDigits.length !== 9) errs.phone = t("err_phone_invalid");
    if (!photoPreview) errs.photo = t("err_photo_required");
    setErrors(errs);
    if (Object.keys(errs).length) setShakeKey(k => k + 1);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    setFormError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const updated = await fbApi.completeProfile(account.id, {
        name: fullName, phone: toSudanE164(localPhone), photoFile,
      });
      if (updated.photoUploadFailed) showToast("تم حفظ بياناتك، لكن تعذّر رفع الصورة — أضِفها لاحقاً من الإعدادات", "error");
      onDone(updated);
    } catch (e) {
      setFormError(e.message || "تعذّر حفظ بياناتك، حاول مرة أخرى");
      setShakeKey(k => k + 1);
    } finally {
      setLoading(false);
    }
  };

  const doLogout = async () => { setLoggingOut(true); await onLogout(); };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <div className="bg-gray-950 text-white p-6 pt-14">
        <button onClick={()=>setConfirmLogout(true)} className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/> تسجيل الخروج
        </button>
        <h2 className="text-2xl font-black">{t("complete_profile_title")}</h2>
        <p className="text-gray-400 text-sm mt-1">{t("complete_profile_sub")}</p>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-4 mt-2">
        <div key={errors.photo ? `ph-${shakeKey}` : "ph"} className={`flex flex-col items-center mb-1 ${errors.photo ? "moter-shake" : ""}`}>
          <div className="relative">
            {photoPreview ? (
              <img src={photoPreview} alt={t("photo_label")} className="w-24 h-24 rounded-3xl object-cover"/>
            ) : (
              <div className="w-24 h-24 bg-gray-100 border-2 border-dashed rounded-3xl flex items-center justify-center" style={{borderColor: errors.photo ? "#EF4444" : "var(--bc-b)"}}>
                <Camera size={26} className="text-gray-400"/>
              </div>
            )}
            <label htmlFor={photoInputId} className="absolute -bottom-1 -left-1 w-8 h-8 bg-gray-950 text-white border-2 border-white rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform">
              <Camera size={14}/>
            </label>
            <input id={photoInputId} type="file" accept="image/*" onChange={handlePhoto} className="hidden" aria-label={t("photo_label")}/>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">{t("photo_hint")}</p>
          {errors.photo && <p className="moter-field-error"><AlertCircle size={13}/> {errors.photo}</p>}
        </div>

        <div key={errors.name ? `n-${shakeKey}` : "n"} className={errors.name ? "moter-shake" : ""}>
          <label className="text-sm font-semibold text-gray-700 block mb-2">{t("full_name")}</label>
          <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="اكتب اسمك الكامل"
            aria-invalid={!!errors.name} aria-label={t("full_name")}
            className="w-full border-2 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none transition-colors"
            style={{borderColor: errors.name ? "#EF4444" : (fullName?"var(--ink)":"var(--bc-b)")}}/>
          {errors.name && <p className="moter-field-error"><AlertCircle size={13}/> {errors.name}</p>}
        </div>

        <div key={errors.phone ? `ph2-${shakeKey}` : "ph2"} className={errors.phone ? "moter-shake" : ""}>
          <SudanPhoneField value={localPhone} onChange={setLocalPhone} error={errors.phone} label={t("phone_label")}/>
        </div>

        {formError && <p className="moter-field-error justify-center bg-red-50 rounded-xl px-3 py-2.5"><AlertCircle size={13}/> {formError}</p>}

        <button onClick={submit} disabled={loading}
          className="w-full bg-gray-950 text-white py-4 rounded-xl font-bold text-base mt-2 active:scale-95 transition-transform flex items-center justify-center gap-2">
          {loading && <Spinner/>}
          {loading ? t("saving_profile") : t("continue_btn")}
        </button>
      </div>

      <ConfirmModal
        open={confirmLogout}
        danger
        loading={loggingOut}
        loadingLabel="جارٍ تسجيل الخروج..."
        title="تسجيل الخروج"
        message="سيتم تسجيل خروجك، ويمكنك إكمال بياناتك لاحقاً عند الدخول من جديد."
        confirmLabel="تسجيل الخروج"
        onConfirm={doLogout}
        onCancel={()=>setConfirmLogout(false)}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOMER APP
// ══════════════════════════════════════════════════════════════════════════════
function CustomerApp({ view, setView, onLogout, onAccountDeleted, currentRole, onSwitchRole }) {
  const { t, orders, addOrder, updateOrder, account, updateProfile, pushNotification } = useApp();
  const profile = account;
  const setProfile = updateProfile;
  const [form, setForm] = useState({ pickup:"", pickupLoc:null, dropoff:"", dropoffLoc:null, item:"", notes:"", paymentMethod:"cash" });

  const myOrders = useMemo(() => orders.filter(o => o.customerId === profile.id).sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)), [orders, profile.id]);
  const activeOrder = myOrders.find(o => o.status === "pending" || o.status === "in_transit") || null;
  const [trackingOrderId, setTrackingOrderId] = useState(() => activeOrder ? activeOrder.id : null);
  const trackingOrder = orders.find(o => o.id === trackingOrderId) || null;

  const goTrack = (orderId) => { setTrackingOrderId(orderId); setView("tracking"); };

  const navItems = [
    {id:"home",    Icon:Home,    label:t("nav_home")},
    {id:"drivers", Icon:Users,   label:"السائقون"},
    {id:"history", Icon:History, label:t("nav_history")},
    {id:"profile", Icon:User,    label:t("nav_profile")},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <div className="flex-1 overflow-auto pb-20 view-transition" key={view}>
        {view==="home"          && <CHome     setView={setView} profile={profile} activeOrder={activeOrder} setForm={setForm} onTrack={()=>activeOrder && goTrack(activeOrder.id)}/>}
        {view==="drivers"       && <CDriversList setView={setView}/>}
        {view==="form"          && <CForm     setView={setView} form={form} setForm={setForm}/>}
        {view==="preview"       && <CPreview  setView={setView} form={form} profile={profile} addOrder={addOrder} onConfirmed={goTrack}/>}
        {view==="tracking"      && <CTracking setView={setView} order={trackingOrder} updateOrder={updateOrder}/>}
        {view==="history"       && <CHistory  orders={myOrders}/>}
        {view==="profile"       && <CProfile  onLogout={onLogout} setView={setView} profile={profile} orderCount={myOrders.length}/>}
        {view==="settings"      && <SettingsScreen setView={setView} backTo="profile" profile={profile} setProfile={setProfile} roleLabel={t("role_customer_title")} currentRole={currentRole} onSwitchRole={onSwitchRole} onAccountDeleted={onAccountDeleted} onLogout={onLogout}/>}
        {view==="notifications" && <NotificationsScreen setView={setView} backTo="home"/>}
      </div>
      {["home","drivers","history","profile"].includes(view) && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t flex" style={{borderColor:"var(--bc-d)", maxWidth:480, margin:"0 auto"}}>
          {navItems.map(({id,Icon:Ic,label}) => (
            <button key={id} onClick={()=>setView(id)} aria-label={label} className={`flex-1 min-w-0 flex flex-col items-center py-3 px-1 gap-1 transition-colors ${view===id?"text-gray-950":"text-gray-300"}`}>
              <Ic size={22} strokeWidth={view===id?2.5:1.5} className="flex-shrink-0"/>
              <span className="w-full text-center truncate text-xs font-semibold">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function CHome({ setView, profile, activeOrder, setForm, onTrack }) {
  const startOrder = () => setView("form");
  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-gray-500 text-sm">مرحباً</p>
            <h1 className="text-xl font-black">{profile.name}</h1>
          </div>
          <NotificationBell variant="dark" onOpen={()=>setView("notifications")}/>
        </div>
        <div className="bg-gray-800 rounded-2xl p-5">
          <p className="text-gray-400 text-xs mb-1">خدمة التوصيل</p>
          <p className="font-black text-lg mb-4 flex items-center gap-2"><Bike size={19}/> وصّل أي شيء خلال دقائق</p>
          <button onClick={startOrder} className="w-full bg-white text-gray-950 py-3 rounded-xl font-black text-sm active:scale-95 transition-transform">
            + اطلب توصيلة الآن
          </button>
        </div>
      </div>
      {activeOrder && (
        <div className="mx-4 mt-4 mb-4 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Truck size={17} className="text-blue-600"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-black text-blue-900 text-sm truncate">طلب نشط — {activeOrder.id}</p>
              <p className="text-blue-500 text-xs">{activeOrder.status==="pending" ? "بانتظار إسناد سائق" : "السائق في الطريق إليك"}</p>
            </div>
            <button onClick={onTrack} className="text-blue-600 text-xs font-black bg-blue-100 px-3 py-1.5 rounded-lg flex-shrink-0">تتبع</button>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <DeliveryTimeline order={activeOrder} role="customer" variant="compact"/>
          </div>
        </div>
      )}
      {!activeOrder && <NearbyDriversMap profile={profile}/>}
    </div>
  );
}

function CForm({ setView, form, setForm }) {
  const [errors, setErrors] = useState({});
  const [picker, setPicker] = useState(null); // "pickup" | "dropoff" | null
  const [shakeKey, setShakeKey] = useState(0);

  const validate = () => {
    const errs = {};
    if (!form.pickupLoc) errs.pickup = "الرجاء تحديد نقطة الاستلام على الخريطة";
    if (!form.dropoffLoc) errs.dropoff = "الرجاء تحديد نقطة التسليم على الخريطة";
    if (!form.item.trim()) errs.item = "الرجاء تحديد نوع الشيء المطلوب توصيله";
    setErrors(errs);
    if (Object.keys(errs).length) setShakeKey(k => k + 1);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setView("preview"); };

  const confirmLocation = (loc) => {
    if (picker === "pickup") setForm({ ...form, pickup: loc.label, pickupLoc: { lat:loc.lat, lng:loc.lng } });
    else if (picker === "dropoff") setForm({ ...form, dropoff: loc.label, dropoffLoc: { lat:loc.lat, lng:loc.lng } });
    setPicker(null);
  };

  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <button onClick={()=>setView("home")} className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/> رجوع
        </button>
        <h2 className="text-xl font-black">طلب جديد</h2>
        <p className="text-gray-400 text-sm mt-1">حدّد نقطتي الاستلام والتسليم على الخريطة</p>
      </div>
      <div className="p-5 space-y-5">
        <div key={(errors.pickup||errors.dropoff) ? `loc-${shakeKey}` : "loc"} className={(errors.pickup||errors.dropoff) ? "moter-shake" : ""}>
          <div className="bg-white border-2 rounded-2xl overflow-hidden" style={{borderColor: (errors.pickup||errors.dropoff) ? "#EF4444" : "var(--bc-a)"}}>
            <button type="button" onClick={()=>setPicker("pickup")} className="w-full p-4 border-b text-right active:bg-gray-50 transition-colors" style={{borderColor:"var(--bc-c)"}}>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">نقطة الاستلام</label>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-3 h-3 bg-gray-950 rounded-full flex-shrink-0"/>
                {form.pickupLoc
                  ? <span className="flex-1 text-gray-950 font-semibold min-w-0 truncate">{form.pickup}</span>
                  : <span className="flex-1 text-gray-300 font-semibold min-w-0">اضغط لتحديد نقطة الاستلام</span>}
                <Crosshair size={16} className="text-gray-400 flex-shrink-0"/>
              </div>
            </button>
            <button type="button" onClick={()=>setPicker("dropoff")} className="w-full p-4 text-right active:bg-gray-50 transition-colors">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">نقطة التسليم</label>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-3 h-3 bg-gray-400 rounded-sm flex-shrink-0"/>
                {form.dropoffLoc
                  ? <span className="flex-1 text-gray-950 font-semibold min-w-0 truncate">{form.dropoff}</span>
                  : <span className="flex-1 text-gray-300 font-semibold min-w-0">اضغط لتحديد نقطة التسليم</span>}
                <Crosshair size={16} className="text-gray-400 flex-shrink-0"/>
              </div>
            </button>
          </div>
          {errors.pickup && <p className="moter-field-error"><AlertCircle size={13}/> {errors.pickup}</p>}
          {!errors.pickup && errors.dropoff && <p className="moter-field-error"><AlertCircle size={13}/> {errors.dropoff}</p>}
        </div>

        <div key={errors.item ? `it-${shakeKey}` : "it"} className={errors.item ? "moter-shake" : ""}>
          <label className="text-sm font-bold text-gray-700 block mb-2">وصف الشيء المطلوب توصيله</label>
          <input value={form.item} onChange={e=>setForm({...form,item:e.target.value})}
            placeholder="مثال: طرد ملابس، وجبة عشاء..." aria-label="وصف الشيء المطلوب توصيله"
            className="w-full border-2 rounded-xl px-4 py-3.5 text-gray-950 placeholder-gray-300 focus:outline-none transition-colors" style={{borderColor: errors.item ? "#EF4444" : "var(--bc-b)"}}/>
          {errors.item && <p className="moter-field-error"><AlertCircle size={13}/> {errors.item}</p>}
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">طريقة الدفع</label>
          <div className="w-full p-4 rounded-2xl border-2 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-950 text-white"><Wallet size={17}/></div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-950 text-sm">الدفع عند الاستلام</p>
              <p className="text-gray-400 text-xs truncate">نقداً لليد عند التسليم</p>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 block mb-2">ملاحظات للسائق (اختياري)</label>
          <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
            placeholder="أي تفاصيل إضافية..." rows={3} aria-label="ملاحظات للسائق"
            className="w-full border-2 rounded-xl px-4 py-3.5 text-gray-950 placeholder-gray-300 focus:outline-none transition-colors resize-none" style={{borderColor:"var(--bc-b)"}}/>
        </div>

        <button onClick={next} className="w-full bg-gray-950 text-white py-4 rounded-xl font-black text-base active:scale-95 transition-transform">
          عرض التسعيرة
        </button>
      </div>

      {picker && (
        <LocationPickerScreen
          key={picker}
          title={picker==="pickup" ? "نقطة الاستلام" : "نقطة التسليم"}
          initial={picker==="pickup" ? form.pickupLoc : form.dropoffLoc}
          centerHint={picker==="dropoff" ? form.pickupLoc : null}
          onConfirm={confirmLocation}
          onCancel={()=>setPicker(null)}
        />
      )}
    </div>
  );
}

function CPreview({ setView, form, profile, addOrder, onConfirmed }) {
  const { showToast, pushNotification } = useApp();
  const [loading, setLoading] = useState(false);
  const [onlineCount, setOnlineCount] = useState(null);

  const distance = Math.max(haversineKm(form.pickupLoc, form.dropoffLoc), 0.6);
  const finalPrice = calcDeliveryPrice(distance);

  // عدد السائقين المتصلين الآن — اشتراك حي حقيقي، لا رقم وهمي ثابت
  useEffect(() => {
    const unsub = usersCol.where("role","==","driver").where("online","==",true)
      .onSnapshot((snap) => setOnlineCount(snap.size), () => setOnlineCount(null));
    return unsub;
  }, []);

  const confirm = async () => {
    setLoading(true);
    try {
      const now = new Date();
      const newOrder = await addOrder({
        date: now.toISOString().slice(0,10),
        time: now.toLocaleTimeString("ar", { hour:"2-digit", minute:"2-digit", numberingSystem:"latn" }),
        customerId: profile.id,
        customer: profile.name,
        customerPhone: profile.phone,
        pickup: form.pickup.trim(),
        pickupLoc: form.pickupLoc,
        dropoff: form.dropoff.trim(),
        dropoffLoc: form.dropoffLoc,
        item: form.item.trim(),
        price: finalPrice,
        distance: Math.round(distance*10)/10,
        rating: null,
        paymentMethod: "cash",
        notes: form.notes || "",
      });
      showToast("تم إنشاء طلبك بنجاح");
      pushNotification(profile.id, "طلبك قيد المعالجة", `جارٍ البحث عن أقرب سائق متاح لطلبك ${newOrder.id}`);
      onConfirmed(newOrder.id);
    } catch (e) {
      showToast("تعذّر إنشاء الطلب، تحقّق من اتصالك وحاول مرة أخرى", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <button onClick={()=>setView("form")} className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/> رجوع
        </button>
        <h2 className="text-xl font-black">تفاصيل الطلب</h2>
      </div>
      <div className="p-5 space-y-4">
        <div className="bg-white border rounded-2xl p-5" style={{borderColor:"var(--bc-a)"}}>
          <div className="flex items-start gap-4 pb-4 border-b" style={{borderColor:"var(--bc-c)"}}>
            <div className="flex flex-col items-center gap-1 mt-1 flex-shrink-0">
              <div className="w-3 h-3 bg-gray-950 rounded-full"/>
              <div className="w-0.5 h-8 bg-gray-200"/>
              <div className="w-3 h-3 bg-gray-400 rounded-sm"/>
            </div>
            <div className="flex-1 space-y-4 min-w-0">
              <div><p className="text-xs text-gray-400">من</p><p className="font-black text-gray-950 truncate">{form.pickup||"—"}</p></div>
              <div><p className="text-xs text-gray-400">إلى</p><p className="font-black text-gray-950 truncate">{form.dropoff||"—"}</p></div>
            </div>
          </div>
          <div className="pt-4 grid grid-cols-3 gap-2 text-center">
            {[[distance.toFixed(1),"كيلومتر"],["~"+Math.max(5,Math.round(distance*4)),"دقيقة"],[fmtNum(finalPrice),"ج.س"]].map(([v,l])=>(
              <div key={l}><p className="text-2xl font-black text-gray-950">{v}</p><p className="text-xs text-gray-400">{l}</p></div>
            ))}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0"><Package size={18} className="text-gray-500"/></div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-950 text-sm truncate">{form.item}</p>
            <p className="text-gray-400 text-xs truncate">الدفع عند الاستلام</p>
          </div>
          <button onClick={()=>setView("form")} className="text-xs font-bold text-gray-500 underline flex-shrink-0">تعديل</button>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 text-sm">
          <div className="flex justify-between py-1.5 text-gray-500">
            <span>{distance.toFixed(1)} كم × {PRICING.km} ج.س</span>
            <span>{fmtNum(finalPrice)} ج.س</span>
          </div>
          <div className="flex justify-between py-1.5 border-t font-black text-gray-950 mt-1" style={{borderColor:"var(--bc-b)"}}>
            <span>الإجمالي</span>
            <span>{fmtNum(finalPrice)} ج.س</span>
          </div>
        </div>

        {onlineCount != null && (
          <div className={`flex items-center gap-2.5 rounded-xl p-3 border ${onlineCount>0 ? "bg-green-50 border-green-100" : "bg-amber-50 border-amber-100"}`}>
            <CheckCircle size={16} className={onlineCount>0 ? "text-green-600 flex-shrink-0" : "text-amber-600 flex-shrink-0"}/>
            <p className={`text-sm font-semibold ${onlineCount>0 ? "text-green-800" : "text-amber-800"}`}>
              {onlineCount>0 ? `${onlineCount} سائقون متاحون الآن` : "لا يوجد سائقون متصلون حالياً، قد يتأخر الإسناد"}
            </p>
          </div>
        )}
        <button onClick={confirm} disabled={loading}
          className="w-full bg-gray-950 text-white py-4 rounded-xl font-black text-base active:scale-95 transition-transform flex items-center justify-center gap-2">
          {loading && <Spinner/>}
          {loading ? "جارٍ تأكيد الطلب..." : `تأكيد الطلب — ${fmtNum(finalPrice)} ج.س`}
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LIVE TRACKING MAP — Leaflet + صور قمر صناعي/تضاريس حقيقية من Esri (لا يتطلب مفتاح API)
// نقطة السائق متحركة دوماً بحسب GPS فعلي وارد منه، ونقطة العميل (الوجهة الحالية
// حسب مرحلة الطلب) حمراء ثابتة — لا نرسم أبداً موقعاً للسائق حتى تصل أول إحداثية حقيقية له.
// ══════════════════════════════════════════════════════════════════════════════
function LiveTrackingMap({ pickupLoc, dropoffLoc, driverLoc, phase = "to_pickup" }) {
  const divRef      = useRef(null);
  const mapRef      = useRef(null);
  const drvMkRef    = useRef(null);
  const doneLineRef = useRef(null);
  const puMkRef     = useRef(null);
  const doMkRef     = useRef(null);
  const animRef     = useRef(null);
  const curPosRef   = useRef(null);
  const puRef       = useRef(pickupLoc);
  const doRef       = useRef(dropoffLoc);
  puRef.current = pickupLoc;
  doRef.current = dropoffLoc;

  const pinIcon = (L, active) => L.divIcon({
    html: active ? '<div class="moter-pin-active"></div>' : '<div class="moter-pin-muted"></div>',
    className:"", iconSize: active?[28,38]:[13,13], iconAnchor: active?[14,38]:[6.5,6.5],
  });

  // ── تهيئة الخريطة الثابتة (نقطتا الاستلام/التسليم + خط المسار الباهت) عند أول تركيب ──
  useEffect(() => {
    const el = divRef.current;
    if (!el || mapRef.current || !pickupLoc || !dropoffLoc) return;
    const L = window.L;
    if (!L) return;
    const pu2 = pickupLoc, drp2 = dropoffLoc;

    const map = L.map(el, { zoomControl:false, attributionControl:false, scrollWheelZoom:false, dragging:true, tap:true });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom:19 }).addTo(map);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom:19, opacity:0.92 }).addTo(map);
    L.control.zoom({ position:"bottomright" }).addTo(map);

    puMkRef.current = L.marker([pu2.lat, pu2.lng], { icon: pinIcon(L, phase!=="to_dropoff") }).addTo(map);
    doMkRef.current = L.marker([drp2.lat, drp2.lng], { icon: pinIcon(L, phase==="to_dropoff") }).addTo(map);
    L.polyline([[pu2.lat,pu2.lng],[drp2.lat,drp2.lng]], { color:"#0A0A0A", weight:3, opacity:0.14, dashArray:"9 11" }).addTo(map);

    mapRef.current = map;
    map.fitBounds(L.latLngBounds([[pu2.lat,pu2.lng],[drp2.lat,drp2.lng]]), { padding:[60,60], maxZoom:15 });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      map.remove();
      mapRef.current = null; drvMkRef.current = null; doneLineRef.current = null; curPosRef.current = null;
      puMkRef.current = null; doMkRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── تبديل الدبّوس النشط (الأحمر) بين الاستلام والتسليم عند تغيّر مرحلة الطلب ──
  useEffect(() => {
    const L = window.L;
    if (!L || !puMkRef.current || !doMkRef.current) return;
    puMkRef.current.setIcon(pinIcon(L, phase!=="to_dropoff"));
    doMkRef.current.setIcon(pinIcon(L, phase==="to_dropoff"));
  }, [phase]);

  // ── إنشاء أيقونة السائق عند وصول أول موقع حقيقي، ثم انتقال ناعم (tween) لكل تحديث GPS تالٍ ──
  useEffect(() => {
    const map = mapRef.current, L = window.L;
    if (!map || !driverLoc || !L) return;
    const to = { lat: driverLoc.lat, lng: driverLoc.lng };
    const activePt = phase === "to_dropoff" ? doRef.current : puRef.current;

    const arrowHtml = (heading) => (heading == null)
      ? '<div style="width:10px;height:10px;background:#fff;border-radius:50%"></div>'
      : `<svg class="moter-heading-arrow" width="17" height="17" viewBox="0 0 24 24" fill="#fff" style="transform:rotate(${heading}deg)"><path d="M12 2l7 20-7-5-7 5z"/></svg>`;

    if (!drvMkRef.current) {
      const icon = L.divIcon({ html:`<div class="moter-driver-pin">${arrowHtml(driverLoc.heading)}</div>`, className:"", iconSize:[40,40], iconAnchor:[20,20] });
      drvMkRef.current = L.marker([to.lat, to.lng], { icon, zIndexOffset: 1000 }).addTo(map);
      if (activePt) doneLineRef.current = L.polyline([[to.lat,to.lng],[activePt.lat,activePt.lng]], { color:"#DC2626", weight:4.5, opacity:0.85, lineCap:"round", lineJoin:"round" }).addTo(map);
      curPosRef.current = to;
      return;
    }

    const el = drvMkRef.current.getElement();
    const arrowEl = el && el.querySelector(".moter-heading-arrow");
    if (arrowEl && driverLoc.heading != null) arrowEl.style.transform = `rotate(${driverLoc.heading}deg)`;

    const from = curPosRef.current || to;
    if (animRef.current) cancelAnimationFrame(animRef.current);
    const start = performance.now(), DUR = 900;
    const step = (now) => {
      const tt = Math.min((now - start) / DUR, 1);
      const ease = 1 - Math.pow(1 - tt, 3);
      const lat = from.lat + (to.lat - from.lat) * ease;
      const lng = from.lng + (to.lng - from.lng) * ease;
      drvMkRef.current.setLatLng([lat, lng]);
      if (doneLineRef.current && activePt) doneLineRef.current.setLatLngs([[lat, lng],[activePt.lat, activePt.lng]]);
      if (tt < 1) animRef.current = requestAnimationFrame(step);
      else { curPosRef.current = to; animRef.current = null; }
    };
    animRef.current = requestAnimationFrame(step);
  }, [driverLoc && driverLoc.lat, driverLoc && driverLoc.lng, driverLoc && driverLoc.heading, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{width:"100%",height:"100%",position:"relative"}}>
      <div ref={divRef} style={{width:"100%",height:"100%",background:"#e8e8e8"}}/>
      {!driverLoc && (
        <div className="moter-map-badge">
          <span style={{width:6,height:6,borderRadius:"50%",background:"#FBBF24"}}/> جارٍ تحديد موقع السائق...
        </div>
      )}
    </div>
  );
}

// خريطة "السائقون القريبون" — تُعرض للعميل قبل الطلب، تماماً كتطبيقات مثل ترحال:
// طلب موقع العميل مرة واحدة + اشتراك حي بكل السائقين المتصلين، وفلترة/ترتيب بالمسافة الفعلية.
function NearbyDriversMap({ profile }) {
  const divRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const meMkRef = useRef(null);
  const [myLoc, setMyLoc] = useState(null);
  const [locStatus, setLocStatus] = useState("loading"); // loading | ok | denied
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    if (!navigator.geolocation) { setLocStatus("denied"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => { setMyLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLocStatus("ok"); },
      () => setLocStatus("denied"),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }, []);

  useEffect(() => {
    const unsub = usersCol.where("role", "==", "driver").where("online", "==", true)
      .onSnapshot((snap) => {
        setDrivers(snap.docs.map(d => ({ ...d.data(), id: d.id })).filter(d => d.location && d.id !== (profile && profile.id)));
      }, () => {});
    return unsub;
  }, [profile && profile.id]);

  const nearby = useMemo(() => {
    if (!myLoc) return [];
    return drivers
      .map(d => ({ ...d, distKm: haversineKm(myLoc, d.location) }))
      .filter(d => d.distKm <= 6)
      .sort((a, b) => a.distKm - b.distKm)
      .slice(0, 12);
  }, [drivers, myLoc]);

  useEffect(() => {
    const el = divRef.current;
    if (!el || mapRef.current || !myLoc) return;
    const L = window.L;
    if (!L) return;
    const map = L.map(el, { zoomControl:false, attributionControl:false, scrollWheelZoom:false, dragging:true, tap:true });
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom:19 }).addTo(map);
    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}", { maxZoom:19, opacity:0.92 }).addTo(map);
    map.setView([myLoc.lat, myLoc.lng], 14);
    meMkRef.current = L.marker([myLoc.lat, myLoc.lng], {
      icon: L.divIcon({ html:'<div style="width:16px;height:16px;background:#2563eb;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 4px rgba(37,99,235,.25)"></div>', className:"", iconSize:[16,16], iconAnchor:[8,8] })
    }).addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; markersRef.current = {}; meMkRef.current = null; };
  }, [myLoc]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const map = mapRef.current, L = window.L;
    if (!map || !L) return;
    const seen = new Set();
    nearby.forEach(d => {
      seen.add(d.id);
      const mkHtml = '<div class="moter-driver-pin" style="width:34px;height:34px"><div style="width:9px;height:9px;background:#fff;border-radius:50%"></div></div>';
      if (markersRef.current[d.id]) {
        markersRef.current[d.id].setLatLng([d.location.lat, d.location.lng]);
      } else {
        markersRef.current[d.id] = L.marker([d.location.lat, d.location.lng], {
          icon: L.divIcon({ html: mkHtml, className:"", iconSize:[34,34], iconAnchor:[17,17] })
        }).addTo(map);
      }
    });
    Object.keys(markersRef.current).forEach(id => {
      if (!seen.has(id)) { markersRef.current[id].remove(); delete markersRef.current[id]; }
    });
  }, [nearby]);

  if (locStatus === "denied") return null; // لا نُظهر بطاقة بلا فائدة إن رفض العميل صلاحية الموقع
  return (
    <div className="mx-4 mt-4 bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
      <div style={{height:150, position:"relative", background:"#e8e8e8"}}>
        <div ref={divRef} style={{width:"100%",height:"100%"}}/>
        {locStatus === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50"><Spinner/></div>
        )}
      </div>
      <div className="px-4 py-3 flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${nearby.length ? "bg-green-500" : "bg-gray-300"}`}/>
        <p className="text-xs font-bold text-gray-600">
          {nearby.length > 0 ? `${nearby.length} سائق متاح بالقرب منك الآن` : "لا يوجد سائقون متصلون قريبون حالياً"}
        </p>
      </div>
    </div>
  );
}

function CTracking({ setView, order, updateOrder }) {
  const { showToast } = useApp();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [rating, setRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const [driverProfile, setDriverProfile] = useState(null);

  // اشتراك حي بملف السائق المُسنَد — نفس الاشتراك يمنحنا اسمه وهاتفه وتقييمه
  // ومركبته وموقعه اللحظي معاً، فتبقى كلها متزامنة ولا تتقادم أبداً
  useEffect(() => {
    if (!order || !order.driverId) { setDriverProfile(null); return; }
    const unsub = usersCol.doc(order.driverId).onSnapshot(
      (snap) => setDriverProfile(snap.exists ? { ...snap.data(), id: snap.id } : null),
      () => {}
    );
    return unsub;
  }, [order && order.driverId]);

  if (!order) {
    return (
      <div className="p-5">
        <EmptyState Icon={Package} title="لا يوجد طلب لعرضه" subtitle="عد إلى الرئيسية لإنشاء طلب جديد"
          action={<button onClick={()=>setView("home")} className="mt-4 bg-gray-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm">الرئيسية</button>}/>
      </div>
    );
  }

  const done = order.status === "delivered";
  const cancelled = order.status === "cancelled";
  const driverLoc = driverProfile ? driverProfile.location : null;
  const { progress: pct, etaMin: eta } = computeOrderProgress(order, driverLoc);
  const driverRating = driverProfile ? (driverProfile.ratingAvg != null ? driverProfile.ratingAvg : 5.0) : null;
  const driverName = (driverProfile && driverProfile.name) || order.driver || "سائق Order";

  const copyId = () => {
    try { navigator.clipboard.writeText(order.id); } catch (e) {}
    setCopied(true);
    showToast("تم نسخ رقم الطلب");
    setTimeout(()=>setCopied(false), 1500);
  };

  const doCancel = async () => {
    try {
      await updateOrder(order.id, { status:"cancelled" });
      setConfirmCancel(false);
      showToast("تم إلغاء الطلب", "error");
      setView("home");
    } catch (e) { showToast("تعذّر إلغاء الطلب، حاول مرة أخرى", "error"); }
  };

  const submitRating = async (v) => {
    setRating(v);
    try { await fbApi.rateOrder(order.id, order.driverId, v); showToast("شكراً على تقييمك!"); }
    catch (e) { showToast("تعذّر إرسال التقييم", "error"); }
  };

  return (
    <div style={{minHeight:"100vh", background:"var(--app-bg)"}}>

      {/* ═══ قسم الخريطة — الجزء العلوي ═══ */}
      {!cancelled && order.pickupLoc && order.dropoffLoc ? (
        <div style={{position:"relative", height:300, background:"#ddd"}}>
          <LiveTrackingMap
            pickupLoc={order.pickupLoc}
            dropoffLoc={order.dropoffLoc}
            driverLoc={driverLoc}
            phase={order.phase}
          />

          {/* شريط علوي شبه شفاف فوق الخريطة */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, zIndex:500,
            background:"linear-gradient(to bottom,rgba(10,10,10,.72) 0%,transparent 100%)",
            padding:"14px 16px 32px",
          }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p style={{color:"rgba(255,255,255,.62)", fontSize:11, fontWeight:700, letterSpacing:.5}}>
                  {done ? "اكتمل التوصيل" : order.status==="pending" ? "انتظار سائق" : "جاري التوصيل"}
                </p>
                <button onClick={copyId} style={{display:"flex",alignItems:"center",gap:5,color:"#fff",fontSize:13,fontWeight:800,opacity:.9,marginTop:1}}>
                  {order.id} <Copy size={11}/>{copied && <Check size={11}/>}
                </button>
              </div>
              {!done && eta != null && (
                <div style={{background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",borderRadius:20,padding:"5px 13px",textAlign:"center",flexShrink:0}}>
                  <p style={{color:"#fff",fontSize:22,fontWeight:900,lineHeight:1}}>{eta}</p>
                  <p style={{color:"rgba(255,255,255,.65)",fontSize:10,fontWeight:700}}>دقيقة</p>
                </div>
              )}
              {done && (
                <div style={{background:"#16a34a",borderRadius:20,padding:"6px 14px",flexShrink:0,display:"flex",alignItems:"center",gap:5}}>
                  <CheckCircle size={13} className="text-white"/><p style={{color:"#fff",fontSize:12,fontWeight:900}}>تم التوصيل</p>
                </div>
              )}
            </div>
          </div>

          {/* شارة حالة السائق — أسفل الخريطة */}
          {order.status !== "pending" && !done && (
            <div style={{
              position:"absolute", bottom:12, right:12, left:12, zIndex:500,
              background:"rgba(10,10,10,.82)", backdropFilter:"blur(10px)",
              borderRadius:14, padding:"10px 14px",
              display:"flex", alignItems:"center", gap:10,
            }}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#4ade80",flexShrink:0,boxShadow:"0 0 0 3px rgba(74,222,128,.25)"}}/>
              <p style={{color:"#fff",fontSize:13,fontWeight:800,flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                {driverName} — {order.phase === "to_pickup" ? "في طريقه للاستلام" : "على الطريق إليك"}
              </p>
              <p style={{color:"rgba(255,255,255,.55)",fontSize:11,fontWeight:700,flexShrink:0}}>{Math.round(pct*100)}٪</p>
            </div>
          )}
          {order.status === "pending" && (
            <div style={{
              position:"absolute", bottom:12, right:12, left:12, zIndex:500,
              background:"rgba(217,119,6,.92)", backdropFilter:"blur(8px)",
              borderRadius:14, padding:"10px 14px", textAlign:"center",
              display:"flex", alignItems:"center", justifyContent:"center", gap:7,
            }}>
              <Spinner/><p style={{color:"#fff",fontSize:13,fontWeight:800}}>جارٍ البحث عن سائق قريب...</p>
            </div>
          )}
        </div>
      ) : cancelled ? (
        <div className="bg-gray-800 text-white p-5 pt-14">
          <p style={{fontSize:11,opacity:.55,fontWeight:700,letterSpacing:.5}}>رقم الطلب</p>
          <h2 className="text-xl font-black mt-0.5 flex items-center gap-2"><XCircle size={19}/> تم إلغاء الطلب</h2>
          <p className="text-sm opacity-50 mt-1">{order.id}</p>
        </div>
      ) : null}

      {/* ═══ البطاقات التفاعلية تحت الخريطة ═══ */}
      <div className="p-4 space-y-3 pb-8">

        {/* بطاقة التسليم — نجاح */}
        {done && (
          <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
            <div className="bg-green-50 p-5 text-center border-b" style={{borderColor:"#d1fae5"}}>
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={30} className="text-green-600"/>
              </div>
              <p className="font-black text-green-800 text-lg">تم توصيل طلبك!</p>
              <p className="text-green-600 text-sm mt-1">{order.rating ? "شكراً على تقييمك" : `قيّم تجربتك مع ${driverName}`}</p>
            </div>
            <div className="p-4">
              <div className="flex justify-center gap-3 mb-4">
                {[1,2,3,4,5].map(s=>(
                  <button key={s} onClick={()=>submitRating(s)} disabled={!!order.rating}
                    className="active:scale-110 transition-transform">
                    <Star size={30} className={s<=(order.rating||rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}/>
                  </button>
                ))}
              </div>
              <button onClick={()=>setView("home")} className="w-full bg-gray-950 text-white py-3.5 rounded-xl font-black text-sm">
                العودة للرئيسية
              </button>
            </div>
          </div>
        )}

        {/* بطاقة الإلغاء */}
        {cancelled && (
          <div className="bg-white border rounded-2xl p-5 text-center" style={{borderColor:"var(--bc-a)"}}>
            <p className="font-black text-gray-950 mb-1">تم إلغاء هذا الطلب</p>
            <p className="text-gray-400 text-sm mb-4">يمكنك إنشاء طلب جديد في أي وقت</p>
            <button onClick={()=>setView("home")} className="w-full bg-gray-950 text-white py-3.5 rounded-xl font-black text-sm">العودة للرئيسية</button>
          </div>
        )}

        {/* بطاقة السائق (أثناء التوصيل وليس انتظار) */}
        {!done && !cancelled && order.status !== "pending" && (
          <div className="bg-white border rounded-2xl p-4 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
            {driverProfile && driverProfile.photoURL ? (
              <img src={driverProfile.photoURL} alt={driverName} className="w-14 h-14 rounded-2xl object-cover flex-shrink-0"/>
            ) : (
              <div className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0">
                {driverName[0] || "؟"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-black text-gray-950 truncate">{driverName}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={12} className="text-amber-400 fill-amber-400"/>
                <span className="text-sm text-gray-500">{driverRating != null ? driverRating.toFixed(1) : "5.0"}</span>
              </div>
            </div>
            {driverProfile && (
              <a href={`tel:${(driverProfile.phone||"").replace(/\s/g,"")}`}
                className="w-11 h-11 bg-gray-950 text-white rounded-2xl flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
                <Phone size={17}/>
              </a>
            )}
          </div>
        )}

        {/* مسار التوصيل */}
        {!cancelled && (
          <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
            <DeliveryTimeline order={order} role="customer" eta={eta} variant="full"/>
          </div>
        )}

        {/* تفاصيل الطلب */}
        {!cancelled && (
          <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
            {[
              ["الشيء المطلوب", order.item || "—"],
              ["طريقة الدفع", "الدفع عند الاستلام"],
              ["المبلغ",      `${fmtNum(order.price)} ج.س`],
              ["المسافة",     `${order.distance} كم`],
            ].map(([label, val], i, arr) => (
              <div key={label} className={`flex items-center justify-between px-4 py-3 ${i<arr.length-1?"border-b":""}`}
                style={{borderColor:"var(--bc-c)"}}>
                <span className="text-gray-400 text-sm">{label}</span>
                <span className="font-bold text-gray-950 text-sm">{val}</span>
              </div>
            ))}
          </div>
        )}

        {/* زر الإلغاء */}
        {!done && !cancelled && order.status === "pending" && (
          <button onClick={()=>setConfirmCancel(true)}
            className="w-full border-2 border-red-100 bg-red-50 text-red-600 py-3.5 rounded-xl font-bold text-sm active:scale-95 transition-transform">
            إلغاء الطلب
          </button>
        )}
      </div>

      <ConfirmModal
        open={confirmCancel}
        danger
        title="إلغاء الطلب"
        message="هل أنت متأكد من إلغاء هذا الطلب؟"
        confirmLabel="إلغاء الطلب"
        onConfirm={doCancel}
        onCancel={()=>setConfirmCancel(false)}
      />
    </div>
  );
}

function CHistory({ orders }) {
  const { t } = useApp();
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = q ? orders.filter(o => o.id.toLowerCase().includes(q) || o.pickup.toLowerCase().includes(q) || o.dropoff.toLowerCase().includes(q) || o.item.toLowerCase().includes(q)) : orders;
  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <h2 className="text-xl font-black">طلباتي</h2>
        <p className="text-gray-400 text-sm mt-1">سجل جميع طلباتك</p>
      </div>
      <div className="px-4 pt-4">
        <div className="relative">
          <SearchIcon size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("search_ph_orders")}
            aria-label={t("search_ph_orders")}
            className="w-full border-2 rounded-xl pr-11 pl-4 py-2.5 text-sm text-gray-950 placeholder-gray-300 focus:outline-none focus:border-gray-950 transition-colors" style={{borderColor:"var(--bc-b)"}}/>
        </div>
      </div>
      {shown.length === 0 && (
        <EmptyState Icon={Package} title={query ? t("no_results_title") : t("no_history_title")}
          subtitle={query ? t("no_results_orders") : t("no_history_sub")}
          action={query && <button onClick={()=>setQuery("")} className="mt-4 text-sm font-bold text-gray-950 underline">{t("clear_search")}</button>}/>
      )}
      <div className="p-4 space-y-3">
        {shown.map(o=>{
          return (
          <div key={o.id} className="bg-white border rounded-2xl p-4" style={{borderColor:"var(--bc-a)"}}>
            <div className="flex justify-between items-center mb-3 gap-2">
              <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-0.5 rounded-lg">{o.id}</span>
              <Badge status={o.status}/>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <div className="flex flex-col items-center gap-1 mt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 bg-gray-950 rounded-full"/>
                <div className="w-px h-5 bg-gray-200"/>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-sm"/>
              </div>
              <div className="space-y-2 min-w-0">
                <p className="text-sm font-bold text-gray-950 truncate">{o.pickup}</p>
                <p className="text-sm text-gray-500 truncate">{o.dropoff}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-3 border-t text-xs" style={{borderColor:"var(--bc-c)"}}>
              <span className="text-gray-400 truncate">{o.time} • {o.item}</span>
              <span className="font-black text-gray-950 flex-shrink-0">{o.price} ج.س</span>
            </div>
            {o.status === "delivered" && o.rating && (
              <div className="flex justify-end mt-2"><RatingStars value={o.rating} size={11}/></div>
            )}
          </div>
        );})}
      </div>
    </div>
  );
}

function CProfile({ onLogout, setView, profile, orderCount }) {
  const { notifications } = useApp();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const doLogout = async () => { setLoggingOut(true); await onLogout(); };
  const unread = notifications.filter(n=>!n.read).length;
  const items = [
    {Icon:Package,label:"طلباتي",sub:`${orderCount} طلب`, action:()=>setView("history")},
    {Icon:Bell,label:"الإشعارات",sub: unread>0 ? `${unread} جديد` : "", action:()=>setView("notifications")},
    {Icon:Settings,label:"الإعدادات",sub:"", action:()=>setView("settings")},
  ];
  return (
    <div>
      <div className="bg-gray-950 text-white p-8 pt-14 text-center">
        {profile.photoURL ? (
          <img src={profile.photoURL} alt={profile.name} className="w-20 h-20 rounded-3xl object-cover mx-auto mb-3"/>
        ) : (
          <div className="w-20 h-20 bg-white text-gray-950 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-3">{profile.name[0]}</div>
        )}
        <h2 className="text-xl font-black">{profile.name}</h2>
        <p className="text-gray-500 text-sm" dir="ltr">{profile.phone}</p>
      </div>
      <div className="p-5 space-y-3">
        {items.map(({Icon:Ic,label,sub,action})=>(
          <button key={label} onClick={action} className="w-full bg-white border rounded-xl p-4 flex items-center gap-3 active:bg-gray-50" style={{borderColor:"var(--bc-a)"}}>
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><Ic size={17} className="text-gray-700"/></div>
            <span className="font-bold text-gray-950 flex-1 min-w-0 truncate text-right">{label}</span>
            {sub && <span className="text-gray-400 text-sm flex-shrink-0 whitespace-nowrap">{sub}</span>}
            <ChevronRight size={15} className="text-gray-300 flex-shrink-0" style={{transform:"scaleX(-1)"}}/>
          </button>
        ))}
        <button onClick={()=>setConfirmLogout(true)} className="w-full bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0"><LogOut size={17} className="text-red-500"/></div>
          <span className="font-bold text-red-600 flex-1 min-w-0 truncate text-right">تسجيل الخروج</span>
        </button>
      </div>
      <ConfirmModal
        open={confirmLogout}
        danger
        loading={loggingOut}
        loadingLabel="جارٍ تسجيل الخروج..."
        title="تسجيل الخروج"
        message="هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟"
        confirmLabel="تسجيل الخروج"
        onConfirm={doLogout}
        onCancel={()=>setConfirmLogout(false)}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// قائمة كل السائقين — تبويب سفلي جديد للعميل. عرض بأسلوب قائمة تواصل احترافية:
// صورة + اسم + حالة الاتصال لكل سائق، مع زرَي اتصال وطلب توصيلة. بيانات حية من
// Firestore دوماً — لا أسماء أو صور تجريبية ثابتة.
// ══════════════════════════════════════════════════════════════════════════════
function CDriversList({ setView }) {
  const [drivers, setDrivers] = useState(null); // null = جارٍ التحميل
  const [query, setQuery] = useState("");

  useEffect(() => {
    const unsub = usersCol.where("role","==","driver").where("profileComplete","==",true)
      .onSnapshot(
        (snap) => {
          const list = snap.docs.map(d => ({ id:d.id, ...d.data() }));
          list.sort((a,b) => (b.online?1:0)-(a.online?1:0) || String(a.name||"").localeCompare(String(b.name||""),"ar"));
          setDrivers(list);
        },
        () => setDrivers([])
      );
    return unsub;
  }, []);

  const shown = useMemo(() => {
    if (!drivers) return [];
    const q = query.trim();
    return q ? drivers.filter(d => String(d.name||"").includes(q)) : drivers;
  }, [drivers, query]);

  const onlineCount = drivers ? drivers.filter(d=>d.online).length : 0;

  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <h2 className="text-xl font-black">السائقون</h2>
        <p className="text-gray-400 text-sm mt-1">{drivers ? `${drivers.length} سائق مسجَّل • ${onlineCount} متصل الآن` : "جارٍ التحميل..."}</p>
      </div>
      <div className="p-4 pb-2">
        <div className="relative">
          <SearchIcon size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث باسم السائق" aria-label="ابحث باسم السائق"
            className="w-full border-2 rounded-xl pr-11 pl-4 py-2.5 text-sm text-gray-950 placeholder-gray-300 focus:outline-none focus:border-gray-950 transition-colors" style={{borderColor:"var(--bc-b)"}}/>
        </div>
      </div>

      {drivers === null ? (
        <div className="px-4 pt-2 space-y-2">{[1,2,3,4].map(i=><SkeletonCard key={i}/>)}</div>
      ) : shown.length === 0 ? (
        <EmptyState Icon={Users} title={query ? "لا توجد نتائج" : "لا يوجد سائقون مسجَّلون بعد"} subtitle={query ? "جرّب اسماً آخر" : "سيظهر السائقون هنا فور تسجيلهم في التطبيق"}/>
      ) : (
        <div className="divide-y" style={{borderColor:"var(--bc-c)"}}>
          {shown.map(d => (
            <div key={d.id} className="flex items-center gap-3 px-4 py-3">
              <div className="relative flex-shrink-0" style={{width:52,height:52}}>
                {d.photoURL ? (
                  <img src={d.photoURL} alt={d.name} className="rounded-2xl object-cover" style={{width:52,height:52}}/>
                ) : (
                  <div className="rounded-2xl bg-gray-100 text-gray-500 flex items-center justify-center font-black text-lg" style={{width:52,height:52}}>{String(d.name||"?")[0]}</div>
                )}
                <span className="absolute -bottom-0.5 -left-0.5 w-3.5 h-3.5 rounded-full border-2 border-white" style={{background: d.online ? "#22C55E" : "#D1D5DB"}}/>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-950 text-sm truncate">{d.name}</p>
                <p className={`text-xs font-semibold ${d.online ? "text-green-600" : "text-gray-400"}`}>{d.online ? "متصل الآن" : "غير متصل"}</p>
              </div>
              <a href={`tel:${d.phone||""}`} aria-label={`اتصال بـ ${d.name}`}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform">
                <Phone size={16} className="text-gray-700"/>
              </a>
              <button onClick={()=>setView("form")} aria-label="اطلب توصيلة" type="button"
                className="w-10 h-10 bg-gray-950 rounded-full flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform">
                <Bike size={16} className="text-white"/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DRIVER APP
// ══════════════════════════════════════════════════════════════════════════════
function DriverApp({ view, setView, onLogout, onAccountDeleted, currentRole, onSwitchRole }) {
  const { t, orders, updateOrder, account, updateProfile, showToast } = useApp();
  const profile = account;
  const setProfile = updateProfile;
  const [onlineOverride, setOnlineOverride] = useState(null); // تحديث متفائل فوري بينما يُحفظ التغيير الحقيقي
  const online = onlineOverride !== null ? onlineOverride : !!account.online;
  const lastWriteRef = useRef({ t: 0, lat: null, lng: null });

  // تفعيل الاتصال يتطلّب موقعاً حقيقياً أولاً — عميل "متصل" بلا موقع لا معنى له
  // في تطبيق تتبّع حي، فلا نسمح بذلك أصلاً بدل عرض بيانات فارغة أو وهمية لاحقاً
  const setOnline = (updater) => {
    const next = typeof updater === "function" ? updater(online) : updater;
    if (!next) {
      setOnlineOverride(false);
      updateProfile({ online: false }).then(() => setOnlineOverride(null))
        .catch(() => { setOnlineOverride(null); showToast("تعذّر تحديث حالة الاتصال", "error"); });
      return;
    }
    if (!navigator.geolocation) { showToast("جهازك لا يدعم تحديد الموقع", "error"); return; }
    setOnlineOverride(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude, heading: pos.coords.heading || null, updatedAt: Date.now() };
        updateProfile({ online: true, location: loc }).then(() => setOnlineOverride(null))
          .catch(() => { setOnlineOverride(null); showToast("تعذّر تحديث حالة الاتصال", "error"); });
      },
      () => { setOnlineOverride(null); showToast("يلزم السماح بصلاحية الموقع لتصبح متصلاً", "error"); },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 10000 }
    );
  };

  const pending = orders.filter(o => o.status === "pending");
  const activeOrder = orders.find(o => o.driverId === profile.id && o.status === "in_transit") || null;

  // بث الموقع الحي طوال مدة الاتصال — بغض النظر عن الشاشة المفتوحة حالياً (لوحة
  // التحكم أو الطلبات أو التوصيل النشط)، بعكس النسخة السابقة التي كانت تتوقف فور
  // مغادرة شاشة "التوصيل النشط" بالذات. التحديث مُقيَّد: كل 4 ثوانٍ أو 20 متراً
  // كحد أدنى، لتفادي إثقال Firestore والبطارية بلا داعٍ.
  useEffect(() => {
    if (!online || !navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng, heading } = pos.coords;
        const now = Date.now();
        const last = lastWriteRef.current;
        const movedKm = last.lat != null ? haversineKm({ lat: last.lat, lng: last.lng }, { lat, lng }) : Infinity;
        if (now - last.t < 4000 && movedKm < 0.02) return;
        lastWriteRef.current = { t: now, lat, lng };
        fbApi.updateDriverLocation(profile.id, { lat, lng, heading: heading || null, updatedAt: now }).catch(() => {});
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, [online, profile.id]);

  const navItems = [
    {id:"dashboard", Icon:Home,    label:t("nav_home")},
    {id:"orders",    Icon:Package, label:t("nav_orders")},
    {id:"profile",   Icon:User,    label:t("nav_profile")},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <div className="flex-1 overflow-auto pb-20 view-transition" key={view}>
        {view==="dashboard"     && <DDash profile={profile} online={online} setOnline={setOnline} setView={setView} orders={orders} pending={pending} activeOrder={activeOrder}/>}
        {view==="orders"        && <DOrders pending={pending} profile={profile} setView={setView}/>}
        {view==="active"        && <DActive order={activeOrder} profile={profile} setView={setView} updateOrder={updateOrder}/>}
        {view==="profile"       && <DProfile onLogout={onLogout} setView={setView} profile={profile} orders={orders} online={online} setOnline={setOnline}/>}
        {view==="settings"      && <SettingsScreen setView={setView} backTo="profile" profile={profile} setProfile={setProfile} roleLabel={t("role_driver_title")} currentRole={currentRole} onSwitchRole={onSwitchRole} onAccountDeleted={onAccountDeleted} onLogout={onLogout}/>}
        {view==="notifications" && <NotificationsScreen setView={setView} backTo="dashboard"/>}
      </div>
      {["dashboard","orders","profile"].includes(view) && (
        <nav className="fixed bottom-0 inset-x-0 bg-white border-t flex" style={{borderColor:"var(--bc-d)", maxWidth:480, margin:"0 auto"}}>
          {navItems.map(({id,Icon:Ic,label}) => (
            <button key={id} onClick={()=>setView(id)} aria-label={label} className={`flex-1 min-w-0 flex flex-col items-center py-3 px-1 gap-1 transition-colors ${view===id?"text-gray-950":"text-gray-300"}`}>
              <Ic size={22} strokeWidth={view===id?2.5:1.5} className="flex-shrink-0"/>
              <span className="w-full text-center truncate text-xs font-semibold">{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

function DDash({ profile, online, setOnline, setView, orders, pending, activeOrder }) {
  const s = driverStats(profile.id, orders);
  const todayDeliveries = orders.filter(o => o.driverId===profile.id && o.status==="delivered" && o.date===todayISO());
  const todayEarnings = todayDeliveries.reduce((sum,o)=>sum+o.price,0);
  const recentTrips = orders.filter(o=>o.driverId===profile.id && o.status==="delivered")
    .sort((a,b)=>(b.date+b.time).localeCompare(a.date+a.time)).slice(0,3);

  return (
    <div>
      <div className={`text-white p-5 pt-14 transition-colors duration-500 ${online?"bg-gray-950":"bg-gray-600"}`}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-black">{profile.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-2 h-2 rounded-full ${online?"bg-green-400":"bg-gray-400"}`}/>
              <span className="text-sm opacity-60">{online?"متصل ونشط":"غير متصل"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell variant="dark" onOpen={()=>setView("notifications")}/>
            <button onClick={()=>setOnline(v=>!v)} aria-label={online?"إيقاف الاتصال":"تفعيل الاتصال"} aria-pressed={online}
              className={`relative w-16 h-8 rounded-full flex-shrink-0 transition-colors ${online?"bg-green-500":"bg-gray-700"}`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${online?"left-9":"left-1"}`}/>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[[String(todayDeliveries.length),"رحلات اليوم"],[fmtNum(todayEarnings),"ج.س اليوم"]].map(([v,l])=>(
            <div key={l} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="font-black text-sm">{v}</p>
              <p className="text-xs opacity-50 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 space-y-4">
        {activeOrder ? (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="font-black text-blue-900">طلب نشط — {activeOrder.id}</p>
              <Badge status="in_transit"/>
            </div>
            <div className="my-3">
              <DeliveryTimeline order={activeOrder} role="driver" variant="compact"/>
            </div>
            <button onClick={()=>setView("active")} className="w-full mt-3 bg-gray-950 text-white py-3 rounded-xl font-black text-sm">
              إدارة التوصيل الآن
            </button>
          </div>
        ) : online ? (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Bike size={26} className="text-green-600"/>
            </div>
            <p className="font-black text-green-900">أنت متاح لاستقبال الطلبات</p>
            <p className="text-green-600 text-sm mt-1 mb-4">{pending.length} طلبات في انتظارك</p>
            <button onClick={()=>setView("orders")} className="bg-gray-950 text-white px-8 py-3 rounded-xl font-black text-sm">عرض الطلبات</button>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <ToggleLeft size={26} className="text-gray-400"/>
            </div>
            <p className="font-black text-gray-600">أنت غير متصل</p>
            <p className="text-gray-400 text-sm mt-1">فعّل التبديل أعلاه لاستقبال الطلبات</p>
          </div>
        )}
        <div>
          <p className="font-black text-gray-950 mb-3">آخر رحلاتي</p>
          {recentTrips.length===0 ? (
            <p className="text-gray-300 text-sm text-center py-6 bg-gray-50 rounded-xl">لا توجد رحلات مكتملة بعد</p>
          ) : (
            <div className="space-y-2">
              {recentTrips.map(o=>(
                <div key={o.id} className="bg-white border rounded-xl p-4 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
                  <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-green-500"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-950 truncate">{o.pickup} ← {o.dropoff}</p>
                    <p className="text-xs text-gray-400">{o.time} • {o.distance} كم</p>
                  </div>
                  <span className="font-black text-gray-950 text-sm flex-shrink-0">{o.price} ج.س</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DOrders({ pending, profile, setView }) {
  const { t, showToast, pushNotification } = useApp();
  const [query, setQuery] = useState("");
  const [acceptingId, setAcceptingId] = useState(null);
  const q = query.trim().toLowerCase();

  // ترتيب الطلبات المتاحة بحسب القرب الفعلي من موقع السائق الحي (لا ترتيب عشوائي)
  const sorted = useMemo(() => {
    const myLoc = profile.location;
    return pending.map(o => {
      const distFromMe = (myLoc && o.pickupLoc) ? haversineKm(myLoc, o.pickupLoc) : null;
      return { ...o, distFromMe };
    }).sort((a, b) => {
      if (a.distFromMe == null) return 1;
      if (b.distFromMe == null) return -1;
      return a.distFromMe - b.distFromMe;
    });
  }, [pending, profile.location]);

  const shown = q ? sorted.filter(o => o.item.toLowerCase().includes(q) || o.pickup.toLowerCase().includes(q) || o.dropoff.toLowerCase().includes(q)) : sorted;

  // قبول محمي بمعاملة Firestore حقيقية (fbApi.acceptOrder) — لو سبقك سائق آخر
  // بجزء من الثانية سيفشل الطلب برسالة واضحة بدل إسناد الطلب لسائقين معاً
  const accept = async (o) => {
    setAcceptingId(o.id);
    try {
      await fbApi.acceptOrder(o.id, profile.id, profile.name);
      showToast(`تم قبول الطلب ${o.id}`);
      pushNotification(o.customerId, "تم إسناد سائق لطلبك", `${profile.name} في طريقه لاستلام طلبك ${o.id}`);
      setView("active");
    } catch (e) {
      showToast(e.message || "تعذّر قبول الطلب", "error");
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <div>
      <div className="bg-gray-950 text-white p-5 pt-14">
        <h2 className="text-xl font-black">الطلبات المتاحة</h2>
        <p className="text-gray-400 text-sm mt-1">{pending.length} طلبات في منطقتك الآن</p>
      </div>
      <div className="p-4 pb-0">
        <div className="relative">
          <SearchIcon size={16} className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-300"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder={t("search_ph_orders")}
            aria-label={t("search_ph_orders")}
            className="w-full border-2 rounded-xl pr-11 pl-4 py-2.5 text-sm text-gray-950 placeholder-gray-300 focus:outline-none focus:border-gray-950 transition-colors" style={{borderColor:"var(--bc-b)"}}/>
        </div>
      </div>
      {shown.length === 0 && (
        <EmptyState Icon={Bike} title={query ? t("no_results_title") : t("no_pending_orders_title")}
          subtitle={query ? t("no_results_orders") : t("no_pending_orders_sub")}
          action={query && <button onClick={()=>setQuery("")} className="mt-4 text-sm font-bold text-gray-950 underline">{t("clear_search")}</button>}/>
      )}
      <div className="p-4 space-y-4">
        {shown.map(o=>{
          return (
          <div key={o.id} className="bg-white border-2 rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
            <div className="p-4">
              <div className="flex justify-between items-start gap-3 mb-3">
                <div className="min-w-0 flex-1">
                  <p className="font-black text-gray-950 text-base truncate">{o.customer}</p>
                  <p className="text-gray-400 text-xs truncate">{o.item}</p>
                </div>
                <div className="text-left flex-shrink-0">
                  <p className="text-2xl font-black text-gray-950 whitespace-nowrap">{o.price}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">جنيه سوداني</p>
                </div>
              </div>
              <div className="space-y-2.5 py-3 border-y" style={{borderColor:"var(--bc-c)"}}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 bg-gray-950 rounded-full flex-shrink-0"/>
                  <p className="text-sm font-semibold text-gray-950 truncate min-w-0">{o.pickup}</p>
                </div>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-sm flex-shrink-0"/>
                  <p className="text-sm text-gray-500 truncate min-w-0">{o.dropoff}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 text-xs text-gray-400 flex-wrap gap-3">
                <span className="flex items-center gap-1"><MapPin size={12}/> {o.distFromMe!=null ? `${o.distFromMe.toFixed(1)} كم منك` : `${o.distance} كم`}</span>
                <span className="flex items-center gap-1"><Clock size={12}/> ~{Math.round(o.distance*4)} دقيقة</span>
                <span>الدفع عند الاستلام</span>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t" style={{borderColor:"var(--bc-d)"}}>
              <button disabled={acceptingId===o.id} className="py-3.5 text-gray-400 font-semibold text-sm border-l active:bg-gray-50" style={{borderColor:"var(--bc-d)"}}>
                تجاهل
              </button>
              <button onClick={()=>accept(o)} disabled={acceptingId===o.id}
                className="py-3.5 bg-gray-950 text-white font-black text-sm active:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                {acceptingId===o.id && <Spinner/>}
                {acceptingId===o.id ? "جارٍ القبول..." : "قبول الطلب"}
              </button>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
}

function DActive({ order, profile, setView, updateOrder }) {
  const { showToast } = useApp();

  if (!order) {
    return (
      <div className="p-5">
        <EmptyState Icon={Bike} title="لا توجد توصيلة جارية" subtitle="اقبل طلباً من قائمة الطلبات المتاحة"
          action={<button onClick={()=>setView("orders")} className="mt-4 bg-gray-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm">الطلبات المتاحة</button>}/>
      </div>
    );
  }

  const myLoc = profile.location;
  const toPickup = order.phase !== "to_dropoff";
  const { progress, etaMin: eta, remainingKm, hasLiveLocation } = computeOrderProgress(order, myLoc);
  const done = progress >= 1;
  // السماح بالتقدّم للخطوة التالية إن لم يتوفر بعد موقع حي (لا نحجز السائق بسبب
  // عطل GPS مؤقت)، أو إن اقترب فعلياً (أقل من 350 متراً) من الوجهة الحالية
  const canAdvance = !hasLiveLocation || (remainingKm != null && remainingKm <= 0.35);

  const openNavigation = () => {
    const dest = toPickup ? order.pickupLoc : order.dropoffLoc;
    if (!dest) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}`, "_blank");
  };

  const confirmPickup = async () => {
    try {
      await updateOrder(order.id, { phase: "to_dropoff" });
      showToast("تم استلام الطلب — توجّه الآن للتسليم");
    } catch (e) { showToast("تعذّر تحديث حالة الطلب", "error"); }
  };

  const finish = async () => {
    try {
      await updateOrder(order.id, { status: "delivered" });
      fbApi.pushNotification(order.customerId, "تم توصيل طلبك", `تم توصيل الطلب ${order.id} بنجاح، لا تنسَ تقييم السائق`).catch(()=>{});
      showToast("تم تسليم الطلب بنجاح");
      setView("dashboard");
    } catch (e) { showToast("تعذّر تأكيد التسليم", "error"); }
  };

  return (
    <div style={{minHeight:"100vh", background:"var(--app-bg)"}}>

      {/* ═══ الخريطة الحية — تملأ الجزء العلوي بالكامل ═══ */}
      {order.pickupLoc && order.dropoffLoc && (
        <div style={{position:"relative", height:290, background:"#ddd"}}>
          <LiveTrackingMap
            pickupLoc={order.pickupLoc}
            dropoffLoc={order.dropoffLoc}
            driverLoc={myLoc}
            phase={order.phase}
          />

          {/* شريط علوي — تدرج شفاف */}
          <div style={{
            position:"absolute", top:0, left:0, right:0, zIndex:500,
            background:"linear-gradient(to bottom,rgba(10,10,10,.75) 0%,transparent 100%)",
            padding:"14px 16px 30px",
          }}>
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p style={{color:"rgba(255,255,255,.55)",fontSize:11,fontWeight:700,letterSpacing:.4}}>{toPickup ? "التوجّه للاستلام" : "جارٍ توصيل"}</p>
                <p style={{color:"#fff",fontSize:14,fontWeight:900,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{order.id}</p>
              </div>
              <div style={{
                background: done ? "#16a34a" : "rgba(255,255,255,.15)",
                backdropFilter:"blur(8px)",
                borderRadius:20,
                padding:"5px 13px",
                textAlign:"center",
                flexShrink:0,
              }}>
                <p style={{color:"#fff",fontSize:22,fontWeight:900,lineHeight:1}}>{done? <Check size={20} style={{display:"inline"}}/> :(eta != null ? eta : "…")}</p>
                <p style={{color:"rgba(255,255,255,.65)",fontSize:10,fontWeight:700}}>{done?"اكتمل":"دقيقة"}</p>
              </div>
            </div>
          </div>

          {/* شريط شارة سفلي — وضع التوصيل */}
          <div style={{
            position:"absolute", bottom:12, right:12, left:12, zIndex:500,
            background: done ? "rgba(22,163,74,.92)" : "rgba(10,10,10,.82)",
            backdropFilter:"blur(10px)",
            borderRadius:14,
            padding:"10px 14px",
            display:"flex",
            alignItems:"center",
            gap:10,
          }}>
            <div style={{
              width:8, height:8, borderRadius:"50%",
              background: done ? "#fff" : "#4ade80",
              flexShrink:0,
              boxShadow: done ? "none" : "0 0 0 3px rgba(74,222,128,.25)",
            }}/>
            <p style={{color:"#fff",fontSize:13,fontWeight:800,flex:1,minWidth:0}}>
              {done ? "اكتملت التوصيلة — اضغط تأكيد التسليم" : toPickup ? `نقطة الاستلام: ${order.pickup}` : `الوجهة: ${order.dropoff}`}
            </p>
            {!done && remainingKm != null && <p style={{color:"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,flexShrink:0}}>{remainingKm.toFixed(1)} كم</p>}
          </div>
        </div>
      )}

      {/* ═══ بطاقات المعلومات والإجراءات ═══ */}
      <div className="p-4 space-y-3 pb-8">

        {/* بطاقة العميل */}
        <div className="bg-white border rounded-2xl p-4 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
          <div className="w-14 h-14 bg-gray-950 text-white rounded-2xl flex items-center justify-center text-2xl font-black flex-shrink-0">
            {order.customer[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-black text-gray-950 truncate">{order.customer}</p>
            <p className="text-gray-400 text-sm truncate mt-0.5">{order.item}</p>
          </div>
          <a href={`tel:${(order.customerPhone||"").replace(/\s/g,"")}`}
            className="w-11 h-11 bg-gray-950 text-white rounded-2xl flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
            <Phone size={17}/>
          </a>
        </div>

        {/* مسار الاستلام → التسليم — نبرز الوجهة الحالية بحسب الطور */}
        <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
          <div className={`flex items-center gap-3 px-4 py-3 border-b ${toPickup?"bg-gray-50":""}`} style={{borderColor:"var(--bc-c)"}}>
            <div className="w-2.5 h-2.5 bg-gray-950 rounded-full flex-shrink-0"/>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-semibold mb-0.5">الاستلام{toPickup?" ← وجهتك الآن":""}</p>
              <p className="font-bold text-gray-950 text-sm truncate">{order.pickup}</p>
            </div>
          </div>
          <div className={`flex items-center gap-3 px-4 py-3 ${!toPickup?"bg-gray-50":""}`}>
            <div className="w-2.5 h-2.5 bg-gray-400 rounded-sm flex-shrink-0"/>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 font-semibold mb-0.5">التسليم{!toPickup?" ← وجهتك الآن":""}</p>
              <p className="font-bold text-gray-950 text-sm truncate">{order.dropoff}</p>
            </div>
          </div>
        </div>

        {/* مخطط تقدم التوصيل */}
        <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
          <DeliveryTimeline order={order} role="driver" eta={eta} variant="full"/>
        </div>

        {/* أزرار الإجراءات */}
        {done ? (
          <button onClick={finish}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-black text-base active:scale-95 transition-transform flex items-center justify-center gap-2">
            <Check size={18}/> تأكيد إتمام التوصيل
          </button>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:+249900000000"
                className="bg-white border text-gray-700 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
                style={{borderColor:"var(--bc-a)"}}>
                <Phone size={15}/> الدعم الفني
              </a>
              <button onClick={openNavigation}
                className="bg-gray-950 text-white py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Navigation size={15}/> {toPickup ? "التنقل للاستلام" : "التنقل للتسليم"}
              </button>
            </div>
            {toPickup ? (
              <button onClick={confirmPickup} disabled={!canAdvance}
                className={`w-full py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform flex items-center justify-center gap-2 ${canAdvance?"bg-gray-950 text-white":"bg-gray-100 text-gray-400"}`}>
                {canAdvance ? <><Package size={16}/> استلمت الطلب من نقطة الانطلاق</> : `${remainingKm!=null?remainingKm.toFixed(1)+" كم متبقية":"جارٍ تحديد الموقع"} — اقترب من نقطة الاستلام`}
              </button>
            ) : (
              <button onClick={finish} disabled={!canAdvance}
                className={`w-full py-4 rounded-2xl font-black text-sm active:scale-95 transition-transform flex items-center justify-center gap-2 ${canAdvance?"bg-green-500 text-white":"bg-gray-100 text-gray-400"}`}>
                {canAdvance ? <><CheckCircle size={16}/> تأكيد التسليم</> : `${remainingKm!=null?remainingKm.toFixed(1)+" كم متبقية":"جارٍ تحديد الموقع"} — اقترب من الوجهة`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function DProfile({ onLogout, setView, profile, orders, online, setOnline }) {
  const s = driverStats(profile.id, orders);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const doLogout = async () => { setLoggingOut(true); await onLogout(); };
  return (
    <div>
      <div className="bg-gray-950 text-white p-8 pt-14 text-center">
        {profile.photoURL ? (
          <img src={profile.photoURL} alt={profile.name} className="w-20 h-20 rounded-3xl object-cover mx-auto mb-3"/>
        ) : (
          <div className="w-20 h-20 bg-white text-gray-950 rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-3">{profile.name[0]}</div>
        )}
        <h2 className="text-xl font-black">{profile.name}</h2>
        <p className="text-gray-500 text-sm" dir="ltr">{profile.phone}</p>
      </div>
      <div className="p-5 space-y-3">
        <div className="bg-white border rounded-xl p-4 flex items-center justify-between gap-2" style={{borderColor:"var(--bc-a)"}}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><Bike size={17} className="text-gray-700"/></div>
            <div className="min-w-0">
              <span className="font-bold text-gray-950 block">{online?"متصل":"غير متصل"}</span>
              <span className="text-gray-400 text-xs truncate block">{s.deliveries} توصيلة مكتملة</span>
            </div>
          </div>
          <button onClick={()=>setOnline(v=>!v)} aria-label={online?"إيقاف الاتصال":"تفعيل الاتصال"} aria-pressed={online}
            className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-colors ${online?"bg-green-500":"bg-gray-200"}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${online?"left-6":"left-0.5"}`}/>
          </button>
        </div>
        <button onClick={()=>setView("settings")} className="w-full bg-white border rounded-xl p-4 flex items-center gap-3" style={{borderColor:"var(--bc-a)"}}>
          <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><Settings size={17} className="text-gray-700"/></div>
          <span className="font-bold text-gray-950 flex-1 min-w-0 truncate text-right">الإعدادات</span>
          <ChevronRight size={15} className="text-gray-300 flex-shrink-0" style={{transform:"scaleX(-1)"}}/>
        </button>
        <button onClick={()=>setConfirmLogout(true)} className="w-full bg-red-50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0"><LogOut size={17} className="text-red-500"/></div>
          <span className="font-bold text-red-600 flex-1 min-w-0 truncate text-right">تسجيل الخروج</span>
        </button>
      </div>
      <ConfirmModal
        open={confirmLogout}
        danger
        loading={loggingOut}
        loadingLabel="جارٍ تسجيل الخروج..."
        title="تسجيل الخروج"
        message="هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟"
        confirmLabel="تسجيل الخروج"
        onConfirm={doLogout}
        onCancel={()=>setConfirmLogout(false)}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CONFIRM MODAL — نافذة تأكيد موحّدة لكل إجراءات الحذف/الخروج/الحفظ الحساسة
// ══════════════════════════════════════════════════════════════════════════════
function ConfirmModal({ open, title, message, confirmLabel, cancelLabel, danger, loading, loadingLabel, onConfirm, onCancel }) {
  useScrollLock(open);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 sm:items-center sm:pb-0" style={{background:"rgba(10,10,10,0.55)"}}>
      <div className="w-full bg-white rounded-3xl p-6" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${danger?"bg-red-50":"bg-gray-100"}`}>
          <AlertCircle size={22} className={danger?"text-red-500":"text-gray-700"}/>
        </div>
        <h3 className="font-black text-lg text-gray-950 mb-1.5">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} disabled={loading} className="flex-1 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 active:scale-95 transition-transform disabled:opacity-40">{cancelLabel || "إلغاء"}</button>
          <button onClick={onConfirm} disabled={loading} className={`flex-1 py-3.5 rounded-xl font-black text-white active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-70 ${danger?"bg-red-500":"bg-gray-950"}`}>
            {loading && <Spinner/>}
            {loading ? (loadingLabel || "جارٍ التنفيذ...") : (confirmLabel || "تأكيد")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROLE SWITCHER — تبديل حقيقي بين حساب عميل وحساب سائق مسجَّلين بنفس رقم الهاتف
// ══════════════════════════════════════════════════════════════════════════════
function RoleSwitcher({ current, onSwitch }) {
  const roles = [
    { r:"customer", Icon:User, label:"عميل" },
    { r:"driver",   Icon:Bike, label:"سائق" },
  ];
  return (
    <div className="bg-white border rounded-2xl p-5" style={{borderColor:"var(--bc-a)"}}>
      <h3 className="font-black text-gray-950 mb-1">تبديل الحساب</h3>
      <p className="text-xs text-gray-400 mb-4">إن كان لديك حساب {current==="driver" ? "عميل" : "سائق"} آخر بنفس اسم المستخدم أو حساب Google سننتقل إليه، وإلا سنوجّهك لإنشاء واحد</p>
      <div className="flex bg-gray-50 rounded-2xl p-1.5 gap-1">
        {roles.map(({ r, Icon, label }) => (
          <button key={r} onClick={()=>onSwitch(r)}
            className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs font-black transition-all active:scale-95 ${current===r ? "bg-gray-950 text-white shadow" : "text-gray-500"}`}>
            <Icon size={18} strokeWidth={current===r?2.5:1.5}/>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SETTINGS SCREEN — صفحة إعدادات مستقلة (صورة شخصية، اسم، هاتف، تفضيلات)
// ══════════════════════════════════════════════════════════════════════════════
// ── تغيير كلمة المرور — نافذة حقيقية تتحقق من كلمة المرور الحالية فعلياً ──────
function ChangePasswordModal({ open, onClose, profile }) {
  const { showToast } = useApp();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  useScrollLock(open);
  if (!open) return null;

  const reset = () => { setCurrent(""); setNext(""); setConfirm(""); setErrors({}); setShowCurrent(false); setShowNext(false); setShowConfirm(false); };
  const close = () => { if (loading) return; reset(); onClose(); };

  const submit = async () => {
    const errs = {};
    if (!current) errs.current = "أدخل كلمة المرور الحالية";
    if (!next) errs.next = "أدخل كلمة مرور جديدة";
    else if (next.length < 6) errs.next = "6 أحرف على الأقل";
    else if (getPasswordStrength(next).score < 2) errs.next = "كلمة مرور ضعيفة — أضِف أرقاماً أو رموزاً أو أحرفاً كبيرة";
    if (confirm !== next) errs.confirm = "كلمتا المرور غير متطابقتين";
    setErrors(errs);
    if (Object.keys(errs).length) { setShakeKey(k=>k+1); return; }
    setLoading(true);
    try {
      await fbApi.changePassword(profile.id, profile.authEmail, current, next);
      showToast("تم تغيير كلمة المرور بنجاح");
      reset();
      onClose();
    } catch (e) {
      setErrors({ current: e.message || "تعذّر تغيير كلمة المرور" });
      setShakeKey(k=>k+1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center px-4 pb-4 sm:items-center sm:pb-0" style={{background:"rgba(10,10,10,0.55)"}} onClick={close}>
      <div className="w-full bg-white rounded-3xl p-6" style={{maxWidth:420}} onClick={e=>e.stopPropagation()}>
        <h3 className="font-black text-lg text-gray-950 mb-4">تغيير كلمة المرور</h3>
        <div className="space-y-3">
          <div key={errors.current?`c-${shakeKey}`:"c"} className={errors.current?"moter-shake":""}>
            <div className="relative">
              <input type={showCurrent?"text":"password"} value={current} onChange={e=>setCurrent(e.target.value)} placeholder="كلمة المرور الحالية" dir="ltr" aria-label="كلمة المرور الحالية"
                className="w-full border-2 rounded-xl pl-4 pr-12 py-3 text-gray-900 focus:outline-none transition-colors" style={{borderColor: errors.current ? "#EF4444" : "var(--bc-b)"}}/>
              <button type="button" onClick={()=>setShowCurrent(v=>!v)} aria-label={showCurrent?"إخفاء كلمة المرور":"إظهار كلمة المرور"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showCurrent ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
            {errors.current && <p className="moter-field-error"><AlertCircle size={13}/> {errors.current}</p>}
          </div>
          <div key={errors.next?`n-${shakeKey}`:"n"} className={errors.next?"moter-shake":""}>
            <div className="relative">
              <input type={showNext?"text":"password"} value={next} onChange={e=>setNext(e.target.value)} placeholder="كلمة المرور الجديدة" dir="ltr" aria-label="كلمة المرور الجديدة"
                className="w-full border-2 rounded-xl pl-4 pr-12 py-3 text-gray-900 focus:outline-none transition-colors" style={{borderColor: errors.next ? "#EF4444" : "var(--bc-b)"}}/>
              <button type="button" onClick={()=>setShowNext(v=>!v)} aria-label={showNext?"إخفاء كلمة المرور":"إظهار كلمة المرور"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showNext ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
            {errors.next ? <p className="moter-field-error"><AlertCircle size={13}/> {errors.next}</p> : <PasswordStrengthMeter password={next}/>}
          </div>
          <div key={errors.confirm?`cf-${shakeKey}`:"cf"} className={errors.confirm?"moter-shake":""}>
            <div className="relative">
              <input type={showConfirm?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)} placeholder="تأكيد كلمة المرور الجديدة" dir="ltr" aria-label="تأكيد كلمة المرور الجديدة"
                className="w-full border-2 rounded-xl pl-4 pr-12 py-3 text-gray-900 focus:outline-none transition-colors" style={{borderColor: errors.confirm ? "#EF4444" : "var(--bc-b)"}}/>
              <button type="button" onClick={()=>setShowConfirm(v=>!v)} aria-label={showConfirm?"إخفاء كلمة المرور":"إظهار كلمة المرور"} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={17}/> : <Eye size={17}/>}
              </button>
            </div>
            {errors.confirm && <p className="moter-field-error"><AlertCircle size={13}/> {errors.confirm}</p>}
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={close} disabled={loading} className="flex-1 py-3.5 rounded-xl font-bold text-gray-700 bg-gray-100 active:scale-95 transition-transform disabled:opacity-40">إلغاء</button>
          <button onClick={submit} disabled={loading} className="flex-1 py-3.5 rounded-xl font-black text-white bg-gray-950 flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70">
            {loading && <Spinner/>} {loading ? "جارٍ التغيير..." : "تغيير"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen({ setView, backTo, profile, setProfile, roleLabel, currentRole, onSwitchRole, onAccountDeleted, onLogout }) {
  const { darkMode, setDarkMode, t, showToast } = useApp();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(profile.photoURL);
  const [fullName, setFullName] = useState(profile.name);
  const [localPhone, setLocalPhone] = useState(splitSudanPhone(profile.phone));
  const [notificationsOn, setNotificationsOn] = useState(profile.notificationsEnabled !== false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const inputId = "settingsPhotoInput_" + roleLabel;

  const dirty = fullName.trim() !== profile.name || toSudanE164(localPhone) !== profile.phone
    || !!photoFile || notificationsOn !== (profile.notificationsEnabled !== false);

  const handlePhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs = {};
    const nameTrim = fullName.trim();
    if (!nameTrim) errs.name = t("err_name_required");
    else if (nameTrim.length < 2) errs.name = t("err_name_short");
    const phoneDigits = localPhone.replace(/\D/g, "");
    if (!phoneDigits) errs.phone = t("err_phone_required");
    else if (phoneDigits.length !== 9) errs.phone = t("err_phone_invalid");
    setErrors(errs);
    if (Object.keys(errs).length) setShakeKey(k=>k+1);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    setSaveError("");
    if (!validate()) return;
    setSaving(true);
    try {
      const patch = { name: fullName.trim(), phone: toSudanE164(localPhone), notificationsEnabled: notificationsOn };
      if (photoFile) patch.photoFile = photoFile;
      await setProfile(patch);
      setPhotoFile(null);
      showToast(t("saved_success"));
    } catch (e) {
      setSaveError(e.message || "تعذّر حفظ التغييرات، حاول مرة أخرى");
      setShakeKey(k=>k+1);
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteAccount = async () => {
    setDeleting(true);
    try {
      await fbApi.deleteAccount(profile.id);
      onAccountDeleted();
    } catch (e) {
      showToast(e.message || "تعذّر حذف الحساب", "error");
      setDeleting(false);
    }
  };

  const doLogout = async () => { setLoggingOut(true); await onLogout(); };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-gray-950 text-white p-5 pt-14">
        <button onClick={()=>setView(backTo)} className="flex items-center gap-2 text-gray-400 text-sm mb-4">
          <ArrowLeft size={16} style={{transform:"scaleX(-1)"}}/> {t("back")}
        </button>
        <h2 className="text-xl font-black">{t("settings_title")}</h2>
        <p className="text-gray-400 text-sm mt-1">{roleLabel} • إدارة حسابك الشخصي</p>
      </div>

      <div className="p-5 space-y-4 pb-12 max-w-full">
        {/* الصورة الشخصية */}
        <div className="bg-white border rounded-2xl p-5 flex flex-col items-center" style={{borderColor:"var(--bc-a)"}}>
          <div className="relative">
            {photoPreview ? (
              <img src={photoPreview} alt="الصورة الشخصية" className="w-24 h-24 rounded-3xl object-cover"/>
            ) : (
              <div className="w-24 h-24 bg-gray-950 text-white rounded-3xl flex items-center justify-center text-3xl font-black">{fullName[0] || "?"}</div>
            )}
            <label htmlFor={inputId} className="absolute -bottom-1 -left-1 w-8 h-8 bg-white border-2 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform" style={{borderColor:"var(--bc-a)"}}>
              <Camera size={14} className="text-gray-700"/>
            </label>
            <input id={inputId} type="file" accept="image/*" onChange={handlePhoto} className="hidden" aria-label="تغيير الصورة الشخصية"/>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">اضغط على الأيقونة لتغيير الصورة الشخصية</p>
        </div>

        {/* المعلومات الشخصية */}
        <div className="bg-white border rounded-2xl p-5" style={{borderColor:"var(--bc-a)"}}>
          <h3 className="font-black text-gray-950 mb-4">{t("personal_info")}</h3>
          <div className="space-y-4">
            <div key={errors.name?`n-${shakeKey}`:"n"} className={errors.name?"moter-shake":""}>
              <label className="text-sm font-semibold text-gray-700 block mb-2">{t("full_name")}</label>
              <input value={fullName} onChange={e=>setFullName(e.target.value)} aria-invalid={!!errors.name} aria-label={t("full_name")}
                className="w-full border-2 rounded-xl px-4 py-3 text-gray-950 font-bold focus:outline-none focus:border-gray-950 transition-colors" style={{borderColor: errors.name ? "#EF4444" : "var(--bc-b)"}}/>
              {errors.name && <p className="moter-field-error"><AlertCircle size={13}/> {errors.name}</p>}
            </div>
            <div key={errors.phone?`p-${shakeKey}`:"p"} className={errors.phone?"moter-shake":""}>
              <SudanPhoneField value={localPhone} onChange={setLocalPhone} error={errors.phone} label={t("phone_number")}/>
            </div>
          </div>
        </div>

        {/* التفضيلات */}
        <div className="bg-white border rounded-2xl p-5 space-y-4" style={{borderColor:"var(--bc-a)"}}>
          <h3 className="font-black text-gray-950 mb-1">{t("preferences")}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><Bell size={17} className="text-gray-700"/></div>
              <span className="font-bold text-gray-950 text-sm">{t("notifications_label")}</span>
            </div>
            <button onClick={()=>setNotificationsOn(!notificationsOn)} aria-label={t("notifications_label")} aria-pressed={notificationsOn} className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-colors ${notificationsOn?"bg-green-500":"bg-gray-200"}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notificationsOn?"left-6":"left-0.5"}`}/>
            </button>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">{darkMode ? <Sun size={17} className="text-gray-700"/> : <Moon size={17} className="text-gray-700"/>}</div>
              <span className="font-bold text-gray-950 text-sm">{t("dark_mode_label")}</span>
            </div>
            <button onClick={()=>setDarkMode(v=>!v)} aria-label={t("dark_mode_label")} aria-pressed={darkMode} className={`relative w-12 h-6 rounded-full flex-shrink-0 transition-colors ${darkMode?"bg-green-500":"bg-gray-200"}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${darkMode?"left-6":"left-0.5"}`}/>
            </button>
          </div>
        </div>

        {/* تبديل الحساب */}
        <RoleSwitcher current={currentRole} onSwitch={onSwitchRole}/>

        {/* إجراءات الحساب — تسجيل الخروج وحذف الحساب دوماً مع بعض، بغض النظر عن طريقة الدخول */}
        <div className="bg-white border rounded-2xl overflow-hidden" style={{borderColor:"var(--bc-a)"}}>
          {profile.authMethod === "username" && (
            <button onClick={()=>setChangePassOpen(true)} className="w-full p-4 flex items-center gap-3 border-b active:bg-gray-50" style={{borderColor:"var(--bc-c)"}}>
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><Shield size={17} className="text-gray-700"/></div>
              <span className="font-bold text-gray-950 flex-1 min-w-0 truncate text-right text-sm">تغيير كلمة المرور</span>
              <ChevronRight size={15} className="text-gray-300 flex-shrink-0" style={{transform:"scaleX(-1)"}}/>
            </button>
          )}
          {profile.authMethod !== "username" && (
            <div className="w-full p-4 flex items-center gap-3 border-b" style={{borderColor:"var(--bc-c)"}}>
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><GoogleLogo size={17}/></div>
              <span className="font-bold text-gray-500 flex-1 min-w-0 truncate text-right text-sm">تسجيل الدخول متصل بحساب Google</span>
            </div>
          )}
          <button onClick={()=>setConfirmLogout(true)} className="w-full p-4 flex items-center gap-3 border-b active:bg-gray-50" style={{borderColor:"var(--bc-c)"}}>
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0"><LogOut size={17} className="text-gray-700"/></div>
            <span className="font-bold text-gray-950 flex-1 min-w-0 truncate text-right text-sm">تسجيل الخروج</span>
            <ChevronRight size={15} className="text-gray-300 flex-shrink-0" style={{transform:"scaleX(-1)"}}/>
          </button>
          <button onClick={()=>setConfirmDelete(true)} className="w-full p-4 flex items-center gap-3 active:bg-red-50">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0"><AlertCircle size={17} className="text-red-500"/></div>
            <span className="font-bold text-red-600 flex-1 min-w-0 truncate text-right text-sm">حذف الحساب</span>
          </button>
        </div>

        {saveError && <p className="moter-field-error justify-center bg-red-50 rounded-xl px-3 py-2.5"><AlertCircle size={13}/> {saveError}</p>}
        <button onClick={handleSave} disabled={saving || !dirty}
          className="w-full bg-gray-950 text-white py-4 rounded-xl font-black text-base active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-40">
          {saving && <Spinner/>}
          {saving ? t("saving") : t("save_changes")}
        </button>
      </div>

      <ChangePasswordModal open={changePassOpen} onClose={()=>setChangePassOpen(false)} profile={profile}/>
      <ConfirmModal
        open={confirmLogout}
        danger
        loading={loggingOut}
        loadingLabel="جارٍ تسجيل الخروج..."
        title="تسجيل الخروج"
        message="هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟"
        confirmLabel="تسجيل الخروج"
        onConfirm={doLogout}
        onCancel={()=>setConfirmLogout(false)}
      />
      <ConfirmModal
        open={confirmDelete}
        danger
        loading={deleting}
        loadingLabel="جارٍ حذف الحساب..."
        title="حذف الحساب نهائياً"
        message="هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع بياناتك وطلباتك بشكل دائم. هل تريد المتابعة؟"
        confirmLabel="حذف الحساب"
        onConfirm={confirmDeleteAccount}
        onCancel={()=>setConfirmDelete(false)}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════════════════
const NAV_DEFAULT = { screen:"welcome", role:null, customerView:"home", driverView:"dashboard" };

function loadNav() {
  try {
    const raw = sessionStorage.getItem(SS_NAV);
    if (raw) return { ...NAV_DEFAULT, ...JSON.parse(raw) };
  } catch (e) {}
  return NAV_DEFAULT;
}

function AppShell() {
  // الشاشة الافتتاحية: تبقى ظاهرة كاملة الوضوح حتى تجهيز التطبيق فعلياً (لا حد
  // زمني ثابت يُخفيها بمعزل عن الجاهزية الحقيقية)، ثم تبدأ انتقال خروج قصير،
  // ولا تُزال من العرض إلا بعد اكتمال ذلك الانتقال — فلا تظهر أبداً شاشة فارغة
  // "معلَّقة" بين اختفاء الشعار وظهور واجهة اختيار الحساب.
  const [minDelayDone, setMinDelayDone] = useState(false);
  const [splashMounted, setSplashMounted] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const splashExiting = minDelayDone && authReady;
  const [nav, setNavState] = useState(loadNav);
  const [sessionAccount, setSessionAccount] = useState(null);
  const [pendingUsername, setPendingUsername] = useState(null);
  const isPopping = React.useRef(false);
  const didMount = React.useRef(false);

  const [appSettings, setAppSettings] = useLocalStorageState(LS_SETTINGS, { darkMode:false });
  const [notifications, setNotifications] = useState([]);
  const [orders, setOrders] = useState([]);
  const [toasts, setToasts] = useState([]);

  // ── تثبيت التطبيق (PWA) — نلتقط حدث المتصفح مبكراً ونمنعه من إظهار شريطه
  // التلقائي، لنتحكم نحن بزر التثبيت داخل واجهتنا بدلاً منه ──────────────────
  const [installEvent, setInstallEvent] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  useEffect(() => {
    const standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone;
    if (standalone) setIsInstalled(true);
    const onBeforeInstall = (e) => { e.preventDefault(); setInstallEvent(e); };
    const onInstalled = () => { setIsInstalled(true); setInstallEvent(null); };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);
  const promptInstall = async () => {
    if (!installEvent) return;
    installEvent.prompt();
    try { await installEvent.userChoice; } catch (e) {}
    setInstallEvent(null); // الحدث قابل للاستخدام مرة واحدة فقط من المتصفح
  };

  const t = (key) => DICT[key] || key;
  const setDarkMode = (v) => setAppSettings(s => ({ ...s, darkMode: typeof v === "function" ? v(s.darkMode) : v }));
  const markAllRead = () => { if (sessionAccount) fbApi.markAllNotificationsRead(sessionAccount.id).catch(()=>{}); };

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 2600);
  };
  const pushNotification = (recipientId, title, body) => { fbApi.pushNotification(recipientId, title, body).catch(()=>{}); };
  const addOrder = (orderData) => fbApi.createOrder(orderData);
  const updateOrder = (id, patch) => fbApi.updateOrder(id, patch);

  // تحديث بيانات الحساب الحقيقي (يُستخدم من شاشة الإعدادات وتبديل حالة اتصال السائق)
  const updateProfile = async (patch) => {
    const updated = await fbApi.updateAccount(sessionAccount.id, patch);
    setSessionAccount(updated);
    return updated;
  };

  // حد أدنى قصير لضمان ظهور الشعار فعلياً حتى على اتصال فائق السرعة (لا يمنع
  // الخروج إن كانت المصادقة أبطأ منه — هي من تقرر وحدها متى نبدأ الخروج فعلياً)
  useEffect(() => {
    const timer = setTimeout(() => setMinDelayDone(true), 550);
    return () => clearTimeout(timer);
  }, []);

  // إزالة الشاشة نهائياً من العرض فقط بعد اكتمال انتقال الخروج البصري (opacity)
  useEffect(() => {
    if (!splashExiting) return;
    const timer = setTimeout(() => setSplashMounted(false), 420);
    return () => clearTimeout(timer);
  }, [splashExiting]);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  // ── مصادقة Firebase حقيقية: تُستعاد الجلسة تلقائياً من IndexedDB الخاص بالمتصفح
  // عند فتح التطبيق من جديد، ثم نشترك لحظياً بمستند حسابنا فيبقى محدَّثاً فوراً
  // من أي تغيير (بما فيه من جهاز آخر): حالة الاتصال، التقييم، الصورة، إلخ. ──
  useEffect(() => {
    let unsubDoc = null;
    const unsubAuth = fbAuth.onAuthStateChanged((user) => {
      if (unsubDoc) { unsubDoc(); unsubDoc = null; }
      if (!user) {
        setSessionAccount(null);
        setAuthReady(true);
        setNavState(n => ((n.screen === "app" || n.screen === "onboarding") ? { ...NAV_DEFAULT } : n));
        return;
      }
      unsubDoc = usersCol.doc(user.uid).onSnapshot((snap) => {
        if (snap.exists) {
          const acc = { ...snap.data(), id: user.uid };
          setSessionAccount(acc);
          const target = acc.profileComplete ? "app" : "onboarding";
          setNavState(n => n.screen === target ? n : { ...n, screen: target, role: acc.role });
        }
        // لو المستند غير موجود، لا نُسقط الجلسة فوراً: فور التسجيل مباشرة قد تصل
        // هذه اللحظة قبل اكتمال كتابة المستند فعلياً (سباق عابر)، فتسجيلنا خروج
        // المستخدم هنا كان يُرجعه بلا سبب واضح لشاشة الترحيب مباشرة بعد نجاح
        // الدخول. الحساب الفعلي الذي أعادته fbApi.continueWithUsername/continueWithGoogle
        // يبقى كما هو، وهذا الاشتراك يحدّثه حين يصل المستند فعلاً.
        setAuthReady(true);
      }, () => setAuthReady(true));
    });
    return () => { unsubAuth(); if (unsubDoc) unsubDoc(); };
  }, []); // eslint-disable-line

  // ── اشتراك حي بالطلبات، بحسب الدور: العميل يرى طلباته فقط، والسائق يرى
  // الطلبات المعلَّقة المتاحة للجميع مدموجة مع طلباته الخاصة (بأي حالة) ──
  useEffect(() => {
    if (!sessionAccount) { setOrders([]); return; }
    if (sessionAccount.role === "customer") {
      const unsub = ordersCol.where("customerId", "==", sessionAccount.id)
        .onSnapshot((snap) => setOrders(snap.docs.map(d => ({ ...d.data(), id: d.id }))), () => {});
      return unsub;
    }
    let pendingList = [], mineList = [];
    const merge = () => {
      const map = new Map();
      pendingList.forEach(o => map.set(o.id, o));
      mineList.forEach(o => map.set(o.id, o));
      setOrders(Array.from(map.values()));
    };
    const unsub1 = ordersCol.where("status", "==", "pending")
      .onSnapshot((snap) => { pendingList = snap.docs.map(d => ({ ...d.data(), id: d.id })); merge(); }, () => {});
    const unsub2 = ordersCol.where("driverId", "==", sessionAccount.id)
      .onSnapshot((snap) => { mineList = snap.docs.map(d => ({ ...d.data(), id: d.id })); merge(); }, () => {});
    return () => { unsub1(); unsub2(); };
  }, [sessionAccount && sessionAccount.id, sessionAccount && sessionAccount.role]);

  // ── اشتراك حي بإشعاراتي أنا فقط (recipientId) — لا تسريب بين الحسابات أو الأدوار ──
  useEffect(() => {
    if (!sessionAccount) { setNotifications([]); return; }
    const unsub = notifsCol.where("recipientId", "==", sessionAccount.id).orderBy("createdAt", "desc").limit(50)
      .onSnapshot((snap) => setNotifications(snap.docs.map(d => {
        const data = d.data();
        return { id: d.id, read: !!data.read, title: data.title, body: data.body, time: formatRelativeTime(data.createdAt) };
      })), () => {});
    return unsub;
  }, [sessionAccount && sessionAccount.id]);

  // ── ربط زر الرجوع في المتصفح بحالة التنقل الداخلية للتطبيق ──
  useEffect(() => {
    window.history.replaceState(nav, "");
    const handler = (e) => {
      isPopping.current = true;
      setNavState(e.state || NAV_DEFAULT);
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []); // eslint-disable-line

  useEffect(() => {
    try { sessionStorage.setItem(SS_NAV, JSON.stringify(nav)); } catch (e) {}
    if (!didMount.current) { didMount.current = true; return; }
    if (isPopping.current) { isPopping.current = false; return; }
    window.history.pushState(nav, "");
  }, [nav]);

  const patchNav = (patch) => setNavState(n => ({ ...n, ...patch }));
  const select        = (r) => patchNav({ role:r, screen:"login" });
  const backToWelcome = () => patchNav({ screen:"welcome" });
  const setCustomerView = (v) => patchNav({ customerView:v });
  const setDriverView   = (v) => patchNav({ driverView:v });

  // نجاح تسجيل الدخول أو إنشاء الحساب — يأتي بالحساب الحقيقي من fbApi. لو بياناته
  // الإجبارية (اسم/هاتف/صورة) غير مكتملة بعد نذهب لشاشة إكمالها أولاً، لا للتطبيق مباشرة
  const handleAuthed = (account) => {
    setSessionAccount(account);
    setPendingUsername(null);
    patchNav({ role: account.role, screen: account.profileComplete ? "app" : "onboarding" });
  };

  // إتمام البيانات الإجبارية بعد أول دخول — ينقلنا للتطبيق فوراً
  const handleProfileCompleted = (account) => {
    setSessionAccount(account);
    patchNav({ screen: "app" });
  };

  // تسجيل خروج حقيقي من Firebase Auth
  const logout = async () => {
    await fbApi.logout();
    setSessionAccount(null);
    patchNav({ ...NAV_DEFAULT });
  };

  // بعد حذف الحساب فعلياً من Firebase — فقط نعيد الضبط محلياً
  const onAccountDeleted = () => {
    setSessionAccount(null);
    patchNav({ ...NAV_DEFAULT });
  };

  // التبديل بين حسابَي عميل/سائق — كل دور حساب Firebase Auth مستقل، فنتحقق أولاً
  // هل يوجد حساب أصلاً بنفس اسم المستخدم أو نفس حساب Google، ثم نأخذك لشاشة
  // الدخول (اسم المستخدم يبقى يحتاج كلمة مروره الخاصة؛ Google يكفيه ضغط الزر مجدداً)
  const switchRole = async (targetRole) => {
    if (!sessionAccount || targetRole === sessionAccount.role) return;
    try {
      let match = null;
      if (sessionAccount.authMethod === "google" && sessionAccount.googleUid) {
        match = await fbApi.findByGoogleUid(targetRole, sessionAccount.googleUid);
        setPendingUsername(null);
      } else if (sessionAccount.username) {
        match = await fbApi.findByUsername(targetRole, sessionAccount.username);
        setPendingUsername(sessionAccount.username);
      }
      if (match) showToast("لديك حساب " + (targetRole === "driver" ? "سائق" : "عميل") + " بالفعل — أكمل الدخول للمتابعة");
      else showToast("لا يوجد حساب " + (targetRole === "driver" ? "سائق" : "عميل") + " بعد — يمكنك إنشاء واحد الآن", "error");
      patchNav({ role: targetRole, screen: "login" });
    } catch (e) {
      showToast("تعذّر التحقق من الحساب الآخر الآن", "error");
    }
  };

  const { screen, role } = nav;

  const ctxValue = { darkMode: appSettings.darkMode, setDarkMode, t, notifications, markAllRead, orders, addOrder, updateOrder, showToast, pushNotification, account: sessionAccount, updateProfile, canInstall: !!installEvent && !isInstalled, promptInstall };

  let content = null;
  if (authReady) {
    if (screen === "welcome") content = <WelcomeScreen onSelect={select}/>;
    else if (screen === "login") content = <LoginScreen role={role} onAuthed={handleAuthed} onBack={backToWelcome} prefillUsername={pendingUsername}/>;
    else if (screen === "onboarding" && sessionAccount) content = <CompleteProfileScreen account={sessionAccount} onDone={handleProfileCompleted} onLogout={logout}/>;
    else if (screen === "app" && role === "customer" && sessionAccount) content = <CustomerApp view={nav.customerView} setView={setCustomerView} onLogout={logout} onAccountDeleted={onAccountDeleted} currentRole={role} onSwitchRole={switchRole}/>;
    else if (screen === "app" && role === "driver" && sessionAccount) content = <DriverApp view={nav.driverView} setView={setDriverView} onLogout={logout} onAccountDeleted={onAccountDeleted} currentRole={role} onSwitchRole={switchRole}/>;
    else content = <WelcomeScreen onSelect={select}/>;
  }

  return (
    <AppCtx.Provider value={ctxValue}>
      <div data-theme={appSettings.darkMode ? "dark" : "light"} style={{ background:"var(--app-bg)", minHeight:"100vh" }}>
        {splashMounted && <SplashScreen exiting={splashExiting}/>}
        {content}
        <ToastHost toasts={toasts}/>
      </div>
    </AppCtx.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppShell />);
