'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import ModalSwarm from './ModalSwarm';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
}

const QUICK_KEYS = ['delivery', 'catalog', 'loyalty'] as const;

let nextId = 1;

export default function ChatBot() {
  const t = useTranslations('chat');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [{ id: 0, from: 'bot', text: '' }]);
  const [input, setInput] = useState('');
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ id: 0, from: 'bot', text: t('greeting') }]);
  }, [t]);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = 9999;
  }, [messages]);

  const addMessage = (from: Message['from'], text: string) => {
    nextId += 1;
    setMessages((prev) => [...prev, { id: nextId, from, text }]);
  };

  const askQuick = (key: (typeof QUICK_KEYS)[number]) => {
    addMessage('bot', t(`reply_${key}`));
  };

  const sendMessage = () => {
    const value = input.trim();
    if (!value) return;
    addMessage('user', value);
    setInput('');
    setTimeout(() => addMessage('bot', t('reply_generic')), 700);
  };

  return (
    <>
      <button id="cfab" onClick={() => setOpen((v) => !v)} aria-label="Chat">🧪</button>
      <div id="cbox" className={open ? 'open' : ''}>
        <ModalSwarm />
        <div className="cb-hd">
          <div className="cb-av">🤖</div>
          <div>
            <div className="cb-nm">RIBA Assistant</div>
            <div className="cb-st">
              <span className="green-dot" />
              {t('status_online')}
            </div>
          </div>
        </div>

        <div className="cb-msgs" ref={msgsRef}>
          {messages.map((m) => (
            <div key={m.id} className={`msg ${m.from === 'bot' ? 'bot' : 'usr'}`}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="qchips">
          {QUICK_KEYS.map((key) => (
            <button key={key} className="chip" onClick={() => askQuick(key)}>
              {t(`quick_${key}`)}
            </button>
          ))}
        </div>

        <div className="cb-inp-r">
          <input
            className="cb-inp"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('placeholder')}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button className="cb-snd" onClick={sendMessage} aria-label="Send">➤</button>
        </div>
      </div>
    </>
  );
}
