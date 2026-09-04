'use client';

import { useMemo, useState } from 'react';

type Session = { room: string; title: string; trainer: string; day: number; start: number; end: number; status: 'Confirmée' | 'Planifiée' | 'Brouillon' };
const rooms = ['Salle A — 18 places', 'Salle B — 12 places', 'Salle C — 20 places', 'Salle D — 10 places', 'Salle E — 16 places', 'Salle F — 8 places'];
const initial: Session[] = [
  { room: rooms[0], title: 'Habilitation électrique B0', trainer: 'Camille Martin', day: 0, start: 9, end: 17, status: 'Confirmée' },
  { room: rooms[1], title: 'Prévention & sécurité', trainer: 'Alex Durand', day: 1, start: 9, end: 12.5, status: 'Planifiée' },
  { room: rooms[3], title: 'Travail en hauteur', trainer: 'Camille Martin', day: 3, start: 13.5, end: 17, status: 'Confirmée' },
];
const days = ['Lun. 31 août', 'Mar. 1 sept.', 'Mer. 2 sept.', 'Jeu. 3 sept.', 'Ven. 4 sept.'];

export function Planning() {
  const [sessions, setSessions] = useState(initial);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');
  const shown = useMemo(() => sessions.filter(s => !filter || `${s.title} ${s.trainer} ${s.room}`.toLowerCase().includes(filter.toLowerCase())), [sessions, filter]);
  function addDemo() {
    const candidate: Session = { room: rooms[0], title: 'Accueil nouveaux collaborateurs', trainer: 'Morgan Leroy', day: 0, start: 9, end: 12, status: 'Planifiée' };
    const clash = sessions.some(s => s.room === candidate.room && s.day === candidate.day && s.start < candidate.end && candidate.start < s.end);
    setMessage(clash ? 'Conflit détecté : la Salle A est déjà réservée sur ce créneau.' : 'Session ajoutée.');
    if (!clash) setSessions([...sessions, candidate]);
  }
  return <main><aside><div className="brand"><span>CF</span> RÉSEAU</div><nav><a className="active">Planning</a><a>Sessions</a><a>Formateurs</a><a>Stagiaires</a><a>Salles</a><a>Modèles</a><a>Administration</a></nav><div className="profile">ML<br/><small>Administrateur</small></div></aside>
    <section className="content"><header><div><p className="eyebrow">ORGANISATION DES FORMATIONS</p><h1>Planning des salles</h1></div><button onClick={addDemo}>+ Nouvelle session</button></header>
      <div className="toolbar"><div className="period"><button>‹</button><strong>31 août – 4 septembre 2026</strong><button>›</button><button>Aujourd’hui</button></div><input aria-label="Rechercher" placeholder="Rechercher une formation…" value={filter} onChange={e => setFilter(e.target.value)} /><button className="week">Vue semaine</button></div>
      {message && <div role="alert" className="alert">{message}</div>}
      <div className="availability"><strong>Disponibilités semaine suivante</strong><span>6 salles actives · 4 entièrement disponibles lundi matin</span><button>Consulter</button></div>
      <div className="schedule"><div className="corner">Salles</div>{days.map(d => <div className="day" key={d}>{d}</div>)}{rooms.map(room => <div className="row" key={room}><div className="room"><strong>{room.split(' — ')[0]}</strong><small>{room.split(' — ')[1]}</small></div>{days.map((_, day) => <div className="cell" key={day}>{shown.filter(s => s.room === room && s.day === day).map(s => <article key={s.title} className={`event ${s.status.toLowerCase()}`} style={{ top: `${(s.start - 8) * 22}px`, height: `${(s.end - s.start) * 22}px` }}><strong>{s.title}</strong><span>{s.start}h–{s.end}h · {s.trainer}</span><em>{s.status}</em></article>)}</div>)}</div>)}</div>
      <p className="legend"><i className="confirmed"/> Confirmée <i className="planned"/> Planifiée <i className="draft"/> Brouillon · Les chevauchements de salles et de formateurs sont bloqués.</p>
    </section></main>;
}
