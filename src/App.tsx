import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, Compass, Gamepad2, Images, UserRound, Heart, Sparkles, Gift, Music2, PawPrint, Coffee, Fish, Star, LockKeyhole, ChevronRight, X, Coins, Flower2, Mail, Trophy, Play, RotateCcw, Shuffle, Save, Volume2 } from 'lucide-react'

const photos = [
  '/photos/photo-01.jpg','/photos/photo-02.jpg','/photos/photo-03.jpg','/photos/photo-04.jpg','/photos/photo-05.jpg',
  '/photos/photo-06.jpg','/photos/photo-07.jpg','/photos/photo-08.jpg','/photos/photo-09.jpg','/photos/photo-10.jpg',
  '/photos/photo-11.jpg','/photos/photo-12.jpg','/photos/photo-13.jpg','/photos/photo-14.jpg','/photos/photo-15.jpg'
]
type Tab='home'|'explore'|'games'|'memories'|'profile'
type Room='universe'|'garden'|'cafe'|'aquarium'|'vending'|'bottle'|'secret'|'music'|'diary'|'pet'|'wheel'|'puzzle'|'memory'
const roomItems:{id:Room,name:string,detail:string,icon:string,color:string}[]=[
{id:'universe',name:'Tiny Universe',detail:'Planet kecil berisi kejutan',icon:'🪐',color:'lilac'},
{id:'garden',name:'Mood Garden',detail:'Pilih mood, rawat taman',icon:'🌷',color:'mint'},
{id:'cafe',name:'Virtual Café',detail:'Racik minuman favorit',icon:'🍰',color:'peach'},
{id:'aquarium',name:'Digital Aquarium',detail:'Temani ikan-ikan kecil',icon:'🐠',color:'blue'},
{id:'vending',name:'Vending Machine',detail:'Tukar koin dengan hadiah',icon:'🎁',color:'pink'},
{id:'bottle',name:'Message Bottle',detail:'Buka pesan tersembunyi',icon:'🧴',color:'cream'},
{id:'secret',name:'Secret Room',detail:'Buka dengan 3 achievement',icon:'🔐',color:'lilac'},
{id:'music',name:'Music Room',detail:'Sudut kecil buat bersantai',icon:'🎧',color:'blue'},
{id:'diary',name:'Digital Diary',detail:'Tulis cerita hari ini',icon:'📔',color:'cream'},
{id:'pet',name:'Virtual Pet',detail:'Kasih makan dan elus buddy',icon:'🐰',color:'pink'},
{id:'wheel',name:'Lucky Wheel',detail:'Putar untuk hadiah',icon:'🎡',color:'peach'},
{id:'puzzle',name:'Photo Puzzle',detail:'Susun kembali foto',icon:'🧩',color:'mint'},
{id:'memory',name:'Memory Match',detail:'Cari pasangan foto',icon:'🃏',color:'lilac'}
]
const notes=['Hari ini jangan lupa istirahat, yaaa sayabgkuu cintaa.','Kamu udaaaa ngelakuinn yang terbaik hari ini.','Semoga ada hal kecil yang bikin kamu senyum.','Pelan-pelan aja. Nggak semua hal harus selesai sekarang yaa sayangku.','Reminder kecil: kamu layak dapat hari yang baik.']
const rewards=['A tiny hug ♡','One virtual flower 🌷','A little star ⭐','A warm reminder 💌','A pocket full of sunshine ☀️']
const read=(key:string, fallback:string)=>localStorage.getItem(key)??fallback

export default function App(){
 const [tab,setTab]=useState<Tab>('home')
 const [coins,setCoins]=useState(()=>Number(read('hlw-coins','30')))
 const [claimed,setClaimed]=useState(()=>read('hlw-daily','')===new Date().toDateString())
 const [room,setRoom]=useState<Room|null>(null)
 const [photo,setPhoto]=useState<number|null>(null)
 const [message,setMessage]=useState('')
 const [mood,setMood]=useState(read('hlw-mood','Calm'))
 const [garden,setGarden]=useState(Number(read('hlw-garden','0')))
 const [pet,setPet]=useState(Number(read('hlw-pet','0')))
 const [diary,setDiary]=useState(read('hlw-diary',''))
 const [drink,setDrink]=useState('Strawberry milk')
 const [topping,setTopping]=useState('Whipped cream')
 const [fishFood,setFishFood]=useState(Number(read('hlw-fish','0')))
 const [bottle,setBottle]=useState('')
 const [wheelResult,setWheelResult]=useState('')
 const [music,setMusic]=useState(false)
 const [puzzleOrder,setPuzzleOrder]=useState([0,1,2,3])
 const [memoryCards,setMemoryCards]=useState<number[]>([])
 const [matched,setMatched]=useState<number[]>([])
 const [tapScore,setTapScore]=useState(0)
 const [tapOpen,setTapOpen]=useState(false)
 const [unlocked,setUnlocked]=useState(read('hlw-secret','')==='yes')
 const [achievements,setAchievements]=useState<string[]>(()=>JSON.parse(read('hlw-achievements','["welcome","photos"]')))
 const [cafeMade,setCafeMade]=useState(false)
 useEffect(()=>localStorage.setItem('hlw-coins',String(coins)),[coins])
 useEffect(()=>localStorage.setItem('hlw-mood',mood),[mood])
 useEffect(()=>localStorage.setItem('hlw-garden',String(garden)),[garden])
 useEffect(()=>localStorage.setItem('hlw-pet',String(pet)),[pet])
 useEffect(()=>localStorage.setItem('hlw-fish',String(fishFood)),[fishFood])
 useEffect(()=>localStorage.setItem('hlw-diary',diary),[diary])
 useEffect(()=>localStorage.setItem('hlw-achievements',JSON.stringify(achievements)),[achievements])
 const addCoins=(n:number)=>setCoins(c=>c+n)
 const achieve=(id:string)=>setAchievements(a=>a.includes(id)?a:[...a,id])
 const claim=()=>{if(claimed)return;addCoins(10);setClaimed(true);localStorage.setItem('hlw-daily',new Date().toDateString());achieve('daily')}
 const openMemory=()=>{const deck=[0,1,2,3,0,1,2,3].sort(()=>Math.random()-.5);setMemoryCards(deck);setMatched([]);setRoom('memory')}
 const shufflePuzzle=()=>setPuzzleOrder(v=>[...v].sort(()=>Math.random()-.5))
 const nav=[{id:'home' as Tab,label:'Home',icon:Home},{id:'explore' as Tab,label:'Explore',icon:Compass},{id:'games' as Tab,label:'Games',icon:Gamepad2},{id:'memories' as Tab,label:'Memories',icon:Images},{id:'profile' as Tab,label:'Me',icon:UserRound}]
 const pickBottle=()=>setBottle(notes[Math.floor(Math.random()*notes.length)])
 const spin=()=>{const result=rewards[Math.floor(Math.random()*rewards.length)];setWheelResult(result);addCoins(5);achieve('wheel')}
 const secretOpen=()=>{if(unlocked||achievements.length>=3){setUnlocked(true);localStorage.setItem('hlw-secret','yes');setRoom('secret')}else setMessage('Kumpulkan 3 achievement dulu untuk membuka Secret Room.')}
 const roomOpen=(id:Room)=>{if(id==='secret'){secretOpen();return} if(id==='memory'){openMemory();return}if(id==='puzzle'){setPuzzleOrder([0,1,2,3]);setRoom(id);return}setRoom(id)}
 const finishPuzzle=()=>{if(puzzleOrder.every((v,i)=>v===i)){addCoins(30);achieve('puzzle');setMessage('Puzzle selesai! +30 coins ♡')}else setMessage('Belum pas, coba susun lagi ya.')}
 return <div className="app-shell"><div className="ambient ambient-one"/><div className="ambient ambient-two"/>
 <header className="topbar"><div className="brand"><span className="brand-mark">♡</span><div><b>little wonderland</b><small>a tiny world made for you</small></div></div><div className="coin-pill"><Coins size={16}/><b>{coins}</b></div></header>
 <main><AnimatePresence mode="wait">
 {tab==='home'&&<motion.section key="home" className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
 <div className="welcome-row"><div><span className="eyebrow">YOUR LITTLE ESCAPE ✦</span><h1>Hi, lovely! <span>♡</span></h1><p>Hari ini ada dunia kecil yang nunggu kamu.</p></div><div className="sun-badge">☀️</div></div>
 <section className="hero-card"><div className="hero-copy"><span className="tag">WELCOME HOME</span><h2>Make today<br/>a little sweeter.</h2><p>Explore, play, and find tiny surprises.</p><button className="primary-btn" onClick={()=>setTab('explore')}>Explore world <ChevronRight size={16}/></button></div><div className="hero-art"><div className="cloud cloud-a"/><div className="cloud cloud-b"/><div className="rainbow">🌈</div><div className="bear">🐻‍❄️</div><span className="sparkle s1">✦</span><span className="sparkle s2">✧</span><span className="heart-float">♡</span></div></section>
 <div className="section-heading"><div><span className="eyebrow">A LITTLE SOMETHING</span><h3>Today's treats</h3></div><span className="tiny-label">for you ♡</span></div>
 <div className="treat-grid"><button className="treat-card daily" onClick={claim}><span className="treat-icon">🎀</span><span><b>Daily gift</b><small>{claimed?'Sudah diambil hari ini':'Claim +10 coins'}</small></span><span className="treat-action">{claimed?'✓':'+'}</span></button><button className="treat-card note" onClick={()=>setMessage(notes[Math.floor(Math.random()*notes.length)])}><span className="treat-icon">💌</span><span><b>Little reminder</b><small>Pesan kecil buat kamu</small></span><ChevronRight size={17}/></button></div>
 {message&&<div className="message-card"><span>💗</span><p>{message}</p><button onClick={()=>setMessage('')}><X size={16}/></button></div>}
 <div className="section-heading"><div><span className="eyebrow">PICK A PLACE</span><h3>Explore your world</h3></div><button className="text-btn" onClick={()=>setTab('explore')}>See all <ChevronRight size={14}/></button></div>
 <div className="quick-rooms">{roomItems.slice(0,4).map(r=><button className={`quick-room ${r.color}`} key={r.id} onClick={()=>roomOpen(r.id)}><span>{r.icon}</span><b>{r.name}</b><small>{r.detail}</small></button>)}</div>
 <div className="pet-strip"><div className="pet-avatar" onClick={()=>roomOpen('pet')}>🐰</div><div><b>Your tiny buddy</b><small>Tap to feed and play.</small></div><button onClick={()=>roomOpen('pet')}>Pet <Heart size={14}/></button></div>
 </motion.section>}
 {tab==='explore'&&<motion.section key="explore" className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}><span className="eyebrow">WANDER A LITTLE</span><h1>Explore <span>♡</span></h1><p className="page-intro">Pilih tempat yang mau kamu kunjungi.</p><div className="room-grid">{roomItems.map((r,i)=><button key={r.id} className={`room-card ${r.color}`} onClick={()=>roomOpen(r.id)}><span className="room-emoji">{r.icon}</span><span className="room-number">0{i+1}</span><b>{r.name}</b><small>{r.detail}</small><span className="room-arrow"><ChevronRight size={16}/></span></button>)}</div><div className="unlock-card"><div className="lock-icon"><LockKeyhole/></div><div><b>{unlocked?'Secret Room unlocked':'Something is hiding here'}</b><small>{unlocked?'You found the hidden place.':'Earn 3 achievements to unlock it.'}</small></div><Sparkles/></div></motion.section>}
 {tab==='games'&&<motion.section key="games" className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}><span className="eyebrow">PLAY A LITTLE</span><h1>Play time <span>✦</span></h1><p className="page-intro">Main sebentar, kumpulin wonder coins.</p><div className="game-feature"><div className="game-art">🧸<span>✦</span></div><div><span className="tag">MINI GAME 01</span><h2>Tap the hearts</h2><p>Tap hati sebanyak mungkin untuk dapat koin.</p><button className="primary-btn" onClick={()=>{setTapOpen(true);setTapScore(0)}}><Play size={15}/> Play now</button></div></div>{tapOpen&&<div className="tap-game"><div><b>Heart catcher</b><small>Score: {tapScore}</small></div><div className="heart-buttons">{Array.from({length:9},(_,i)=><button key={i} onClick={()=>setTapScore(s=>s+1)}>{['♡','💗','♥'][i%3]}</button>)}</div><button className="claim-score" onClick={()=>{if(tapScore){addCoins(Math.min(tapScore*2,30));achieve('tap')}setTapOpen(false)}}>Collect {Math.min(tapScore*2,30)} coins</button></div>}<div className="coming-list">{[{id:'memory' as Room,icon:'🃏',name:'Memory match',desc:'Find matching photo pairs'},{id:'puzzle' as Room,icon:'🧩',name:'Photo puzzle',desc:'Put the picture back together'},{id:'wheel' as Room,icon:'🎡',name:'Lucky wheel',desc:'Spin for a tiny surprise'}].map(g=><button key={g.id} onClick={()=>roomOpen(g.id)}><span>{g.icon}</span><b>{g.name}</b><small>{g.desc}</small><em>PLAY</em></button>)}</div></motion.section>}
 {tab==='memories'&&<motion.section key="memories" className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}><span className="eyebrow">A LITTLE PHOTO CORNER</span><h1>Memories <span>♡</span></h1><p className="page-intro">Potongan momen yang disimpan di sini.</p><div className="memory-note"><span>📷</span><div><b>Your photo scrapbook</b><small>Tap foto untuk melihat lebih dekat.</small></div><span className="count">{photos.length} photos</span></div><div className="photo-grid">{photos.map((src,i)=><button className={`photo-tile tile-${i%5}`} key={src} onClick={()=>setPhoto(i)}><img src={src} alt={`Memory ${i+1}`} loading="lazy"/><span>♡</span></button>)}</div></motion.section>}
 {tab==='profile'&&<motion.section key="profile" className="page" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}}><div className="profile-card"><div className="profile-avatar">🐰</div><span className="eyebrow">WONDERLAND MEMBER</span><h1>Little explorer</h1><p>Every little step counts.</p><div className="profile-stats"><div><b>{coins}</b><small>Coins</small></div><div><b>{achievements.length}</b><small>Badges</small></div><div><b>{photos.length}</b><small>Memories</small></div></div></div><div className="section-heading"><div><span className="eyebrow">YOUR COLLECTION</span><h3>Little achievements</h3></div></div><div className="achievement-list">{[{id:'welcome',icon:'🌸',name:'First visit',desc:'Welcome to your wonderland'},{id:'photos',icon:'📸',name:'Memory keeper',desc:'15 photos added'},{id:'daily',icon:'🎁',name:'Daily sweetness',desc:'Claim a daily gift'},{id:'tap',icon:'💗',name:'Heart catcher',desc:'Play tap the hearts'},{id:'puzzle',icon:'🧩',name:'Puzzle pro',desc:'Complete the photo puzzle'},{id:'wheel',icon:'🎡',name:'Lucky day',desc:'Spin the lucky wheel'}].map(a=><div key={a.id}><span>{a.icon}</span><div><b>{a.name}</b><small>{a.desc}</small></div><span className={achievements.includes(a.id)?'done':'locked'}>{achievements.includes(a.id)?'✓':'🔒'}</span></div>)}</div><button className="reset-btn" onClick={()=>{localStorage.clear();location.reload()}}><RotateCcw size={15}/> Reset all demo progress</button></motion.section>}
 </AnimatePresence></main>
 <nav className="bottom-nav">{nav.map(n=>{const I=n.icon;return <button key={n.id} className={tab===n.id?'active':''} onClick={()=>setTab(n.id)}><I size={19}/><small>{n.label}</small></button>})}</nav>
 <AnimatePresence>{photo!==null&&<motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setPhoto(null)}><button className="close-lightbox"><X/></button><motion.img src={photos[photo]} alt="Selected memory" onClick={e=>e.stopPropagation()}/><div className="lightbox-caption">a little memory ♡<small>{photo+1} / {photos.length}</small></div></motion.div>}</AnimatePresence>
 <AnimatePresence>{room&&<motion.div className="room-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="room-modal" initial={{y:25,scale:.97}} animate={{y:0,scale:1}} exit={{y:20,opacity:0}}><button className="room-close" onClick={()=>setRoom(null)}><X/></button>
 <RoomContent room={room} coins={coins} addCoins={addCoins} mood={mood} setMood={setMood} garden={garden} setGarden={setGarden} pet={pet} setPet={setPet} drink={drink} setDrink={setDrink} topping={topping} setTopping={setTopping} fishFood={fishFood} setFishFood={setFishFood} bottle={bottle} pickBottle={pickBottle} wheelResult={wheelResult} spin={spin} music={music} setMusic={setMusic} diary={diary} setDiary={setDiary} puzzleOrder={puzzleOrder} setPuzzleOrder={setPuzzleOrder} finishPuzzle={finishPuzzle} memoryCards={memoryCards} matched={matched} setMatched={setMatched} achievements={achievements} unlocked={unlocked} setUnlocked={setUnlocked} achieve={achieve} setMessage={setMessage} setRoom={setRoom} cafeMade={cafeMade} setCafeMade={setCafeMade}/>
 </motion.div></motion.div>}</AnimatePresence>
 {message&&<div className="toast" onClick={()=>setMessage('')}>{message}<X size={14}/></div>}
 <footer>made with a little love <Heart size={11} fill="currentColor"/></footer></div>
}

function RoomContent(p:any){
 const [local,setLocal]=useState('')
 const [revealed,setRevealed]=useState(false)
 const [turns,setTurns]=useState(0)
 const [fish,setFish]=useState(0)
 const title=roomItems.find(r=>r.id===p.room)?.name??'Little room'
 const reward=(n:number)=>{p.addCoins(n);p.setMessage(`You got +${n} coins ♡`)}
 return <div className="room-content"><div className="room-head"><span className="room-big">{roomItems.find(r=>r.id===p.room)?.icon}</span><span className="eyebrow">YOUR LITTLE CORNER</span><h2>{title}</h2></div>
 {p.room==='universe'&&<><p>Choose a planet and see what it keeps for you.</p><div className="planet-grid">{['🪐','🌙','⭐','🌎'].map((v,i)=><button onClick={()=>setLocal(['A place to rest and breathe.','A little reminder that you matter.','You make ordinary days feel special.','There is always somewhere new to explore.'][i])}>{v}<small>Planet {i+1}</small></button>)}</div>{local&&<div className="room-result">{local}</div>}</>}
 {p.room==='garden'&&<><p>How are you feeling today?</p><div className="mood-options">{['Happy','Calm','Tired','Sad','Excited'].map((m,i)=><button className={p.mood===m?'chosen':''} onClick={()=>p.setMood(m)}>{['☀️','🍃','☁️','🌧️','✨'][i]}<small>{m}</small></button>)}</div><div className="garden-view">{Array.from({length:Math.max(1,p.garden+1)},(_,i)=><span>{['🌱','🌷','🌼','🌸','🌻'][i%5]}</span>)}</div><button className="primary-btn" onClick={()=>{if(p.coins>=5){p.addCoins(-5);p.setGarden(p.garden+1);p.setMessage('Your garden grew!')}}}>Plant a flower · 5 coins</button></>}
 {p.room==='cafe'&&<><p>Make a little treat.</p><label>Choose drink<select value={p.drink} onChange={e=>p.setDrink(e.target.value)}>{['Strawberry milk','Matcha latte','Peach tea','Hot chocolate'].map(x=><option>{x}</option>)}</select></label><label>Topping<select value={p.topping} onChange={e=>p.setTopping(e.target.value)}>{['Whipped cream','Marshmallow','Pearls','Strawberry'].map(x=><option>{x}</option>)}</select></label><div className="drink-preview">🥤<b>{p.drink}</b><small>with {p.topping.toLowerCase()}</small></div><button className="primary-btn" onClick={()=>{p.setCafeMade(true);reward(5)}}>Serve my drink · earn 5 coins</button></>}
 {p.room==='aquarium'&&<><p>Your fish are waiting for snacks.</p><div className="aquarium">🫧　🐠　🫧<br/>🐟　🪸　🐡<br/>🫧　🐟　🫧</div><p>Fed {p.fishFood} times</p><button className="primary-btn" onClick={()=>{p.setFishFood(p.fishFood+1);p.setMessage('The fish are happy!')}}>Feed the fish 🐟</button></>}
 {p.room==='vending'&&<><p>Pick a tiny surprise. Each one costs 10 coins.</p><div className="vending-grid">{['💌','🌷','⭐','🧸','🍓','🎀'].map((v,i)=><button onClick={()=>{if(p.coins>=10){p.addCoins(-10);setLocal(['A kind note for you.','One flower for your day.','Keep shining, little star.','A tiny bear hug.','A sweet strawberry.','A ribbon just for you.'][i])}else setLocal('Not enough coins yet.')}}>{v}</button>)}</div>{local&&<div className="room-result">{local}</div>}</>}
 {p.room==='bottle'&&<><p>A message is floating somewhere inside.</p><div className="bottle-art" onClick={()=>{p.pickBottle();setRevealed(true)}}>🧴<small>tap to open</small></div>{revealed&&<div className="room-result">{read('hlw-bottle-message', 'A little reminder: you deserve a soft day.')}<br/>{local||'You are doing better than you think. ♡'}</div>}<button className="primary-btn" onClick={()=>{const msg=notes[Math.floor(Math.random()*notes.length)];setLocal(msg);setRevealed(true)}}>Open a message</button></>}
 {p.room==='secret'&&<><div className="secret-art">🌙✨🌷</div><h3>You found your secret place.</h3><p>Semoga setiap kali kamu mampir, ada satu hal kecil yang bikin hari terasa lebih ringan.</p><div className="room-result">This little corner belongs to you. ♡</div></>}
 {p.room==='music'&&<><p>A tiny listening corner.</p><div className="music-disc">♫</div><b>Soft little moments</b><small>Ambient mode · browser audio not attached yet</small><button className="primary-btn" onClick={()=>p.setMusic(!p.music)}><Volume2 size={15}/>{p.music?'Pause ambience':'Play ambience'}</button><p className="subtle">Kontrol ini menyimpan status player. File musik bisa ditambahkan di folder public/sounds.</p></>}
 {p.room==='diary'&&<><p>Write anything. This diary stays on this device.</p><textarea className="diary-input" value={p.diary} onChange={e=>p.setDiary(e.target.value)} placeholder="Dear diary, today..."/><div className="save-row"><span>Saved automatically</span><Save size={15}/></div></>}
 {p.room==='pet'&&<><div className="pet-big" onClick={()=>p.setPet(p.pet+1)}>🐰</div><p>Your buddy has {p.pet} affection points.</p><div className="pet-actions"><button onClick={()=>{if(p.coins>=5){p.addCoins(-5);p.setPet(p.pet+3)}}}>🥕 Feed · 5 coins</button><button onClick={()=>p.setPet(p.pet+1)}>♡ Pet buddy</button></div><div className="room-result">{p.pet>10?'Your buddy adores you!':'Your buddy is happy you are here.'}</div></>}
 {p.room==='wheel'&&<><p>One spin gives a random surprise and 5 coins.</p><div className="wheel-art">🎡</div><button className="primary-btn" onClick={p.spin}>Spin the wheel</button>{p.wheelResult&&<div className="room-result">{p.wheelResult}</div>}</>}
 {p.room==='puzzle'&&<><p>Put the tiles in the right order. Tap two tiles to swap.</p><div className="puzzle-grid">{p.puzzleOrder.map((v:number,i:number)=><button onClick={()=>{if(local===''){setLocal(String(i))}else{const j=Number(local);p.setPuzzleOrder((a:number[])=>{const b=[...a];[b[j],b[i]]=[b[i],b[j]];return b});setLocal('')}}}><img src={`/photos/photo-${String(v+1).padStart(2,'0')}.jpg`}/><small>{v+1}</small></button>)}</div><button className="primary-btn" onClick={p.finishPuzzle}>Check puzzle</button><button className="secondary-btn" onClick={()=>p.setPuzzleOrder([0,1,2,3])}>Reset</button></>}
 {p.room==='memory'&&<><p>Find all matching pairs. {p.matched.length/2} of 4 pairs found.</p><div className="memory-game-grid">{p.memoryCards.map((v:number,i:number)=><button className={p.matched.includes(i)?'matched':''} onClick={()=>{if(p.matched.includes(i)||turns===i)return;if(local===''){setLocal(String(i));setTurns(i)}else{const first=Number(local);if(p.memoryCards[first]===v){const next=[...p.matched,first,i];p.setMatched(next);if(next.length===8){reward(25);p.achieve('memory')}}setLocal('');setTurns(-1)}}}>{p.matched.includes(i)?['🌸','🐰','🎀','🍓'][v]:(local===String(i)?['🌸','🐰','🎀','🍓'][v]:'?')}</button>)}</div><button className="secondary-btn" onClick={()=>p.setRoom('memory')}>Restart</button></>}
 </div>
}
