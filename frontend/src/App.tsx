import { useState, FormEvent, useRef, useEffect } from 'react';
import './App.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    // Aqui você pode integrar com backend futuramente para resposta do assistente
  };

  return (
    <div className="chatgpt-container">
      <h1 className="chatgpt-title">Como posso ajudar?</h1>
      <div className="chatgpt-messages">
        {messages.length === 0 && (
          <div className="chatgpt-placeholder">Nenhuma mensagem ainda. Envie sua primeira pergunta!</div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`chatgpt-message ${msg.role}`}>
            <span>{msg.content}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="chatgpt-input-area" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Pergunte alguma coisa"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="chatgpt-input"
        />
        <button type="submit" className="chatgpt-send">Enviar</button>
      </form>
    </div>
  );
}

export default App;
