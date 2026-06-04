import { useState, useEffect } from 'react';
import { Send, Plus, Mic } from 'lucide-react';
import { Logo } from '../components/Logo';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
}

export const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
    try {
      const saved = window.localStorage.getItem('varsigram-campus-user');
      if (saved) {
        const parsed = JSON.parse(saved) as { fullName?: string };
        setUserName(parsed.fullName || null);
        return;
      }
    } catch (e) {}

    const session = window.sessionStorage.getItem('varsigram-campus-session');
    if (session) {
      const s = JSON.parse(session) as { email?: string };
      setUserName(s.email || null);
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content:
          'I can help you learn about various subjects! What specific topic would you like to explore today? I can assist with course materials, concepts, quizzes, summaries and more.',
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1200);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#F9F4F5]">
      {/* Background Glows */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[35%] h-96 w-96 -translate-x-1/2 rounded-full bg-pink-300/30 blur-[140px]" />

        <div className="absolute bottom-10 right-0 h-80 w-80 bg-[#750015]/10 blur-[120px]" />

        <div className="absolute left-0 top-[60%] h-64 w-64 bg-pink-400/20 blur-[100px]" />
      </div>

      {/* Header */}

      <div className="relative z-10 flex items-center justify-between px-5 py-5">
        <button className="text-2xl text-gray-700">
          ☰
        </button>

        <img
          src="/ajanaku.jpg"
          alt="profile"
          className="h-10 w-10 rounded-full border-2 border-[#750015] object-cover"
        />
      </div>

      {/* Content */}

      <div className="relative z-10 flex-1 overflow-y-auto px-4">
        {messages.length === 0 ? (
          <div className="flex min-h-full flex-col items-center justify-center text-center">
            <div className="mb-5 scale-125">
             <svg width="34" height="23" viewBox="0 0 34 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.3845 0.00468599C28.4286 0.000473331 28.473 -0.000901151 28.5174 0.000571354C28.7991 0.0109245 29.6444 0.179257 29.8496 0.314261C30.5301 0.761909 32.9765 2.43153 33.4291 2.91879C33.4515 3.09649 30.9057 6.49046 30.6067 6.89895L25.2837 14.1727L21.5692 19.2516C20.9191 20.1414 19.4016 22.563 18.3741 22.767C17.7065 23.2261 16.2122 22.9314 15.557 22.5312C13.6907 21.3913 12.7321 19.4569 14.1462 17.5002C15.0749 16.2154 16.0275 14.9197 16.9654 13.6378L22.4243 6.17744L24.9662 2.70201C26.1298 1.11286 26.3433 0.368953 28.3845 0.00468599Z" fill="#750015"/>
                    <path d="M16.2029 1.05305C16.3079 1.04684 16.4129 1.04348 16.518 1.04297C18.1579 1.04031 19.0121 1.98345 20.0576 3.039L21.6062 4.5924C19.7037 7.18422 17.5982 9.84566 15.6425 12.4107L13.4556 15.2783C12.7514 16.201 12.355 16.9151 11.321 17.4999C10.9882 17.6253 10.7741 17.719 10.4154 17.7681C9.34588 17.9144 8.69647 17.6149 7.85645 17.0191C7.01019 16.4189 6.47062 15.8221 6.26489 14.7685C6.1238 14.0461 6.31256 13.0872 6.74556 12.4932C8.5591 10.0056 10.3834 7.52199 12.2003 5.03583L13.7161 2.95649C14.5344 1.83548 14.7296 1.29723 16.2029 1.05305Z" fill="#750015"/>
                    <path d="M3.98967 2.51533C6.35721 2.42157 8.68653 4.17032 10.4241 5.6156L7.41846 9.28161C6.92305 9.8841 6.09191 10.9552 5.54945 11.4656C4.11758 12.5763 2.6188 12.475 1.25239 11.3846C0.451459 10.7455 0.227729 10.2252 0.0808515 9.21936C-0.174043 7.4738 0.165526 5.504 1.21667 4.06303C1.99592 3.04342 2.74972 2.68816 3.98967 2.51533Z" fill="#750015"/>
                    </svg>

            </div>

            <h1 className="text-4xl font-semibold text-black">
              Hello
            </h1>

            <p className="mt-8 text-lg font-semibold text-gray-700">
              Welcome to
            </p>

            <h2 className="mt-2 font-serif text-5xl italic text-[#750015]">
              the UniVars!
            </h2>

          
            {/* Suggestion Cards */}

          </div>
        ) : (
          <div className="space-y-6 py-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                {message.type === 'ai' ? (
                  <div className="flex max-w-[85%] items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#750015] text-white">
                      <Logo />
                    </div>

                    <div
                      className="
                        rounded-3xl
                        rounded-bl-lg
                        border
                        border-pink-100
                        bg-white/80
                        px-4
                        py-3
                        text-gray-800
                        shadow-sm
                        backdrop-blur-md
                      "
                    >
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div
                    className="
                      max-w-[80%]
                      rounded-3xl
                      rounded-br-lg
                      bg-[#750015]
                      px-4
                      py-3
                      text-white
                      shadow-lg
                    "
                  >
                    {message.content}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#750015] text-white">
                  <Logo />
                </div>

                <div className="rounded-3xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                      style={{ animationDelay: '0.1s' }}
                    />
                    <span
                      className="h-2 w-2 animate-bounce rounded-full bg-gray-500"
                      style={{ animationDelay: '0.2s' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}

     

      {/* Composer */}

      <div className=" sticky z-10 px-4 pb-5">
        <div
          className="
            rounded-[28px]
            border
            border-pink-200
            bg-[#F7DCE1]/90
            p-4
            shadow-xl
            backdrop-blur-xl
          "
        >
          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyPress}
            placeholder="What material would you like to learn from today?"
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
              placeholder:text-gray-500
            "
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="text-gray-600">
                <Plus size={18} />
              </button>

              <button className="text-gray-600">
                <Mic size={18} />
              </button>
            </div>

            <button
              onClick={handleSend}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-[#750015]
                text-white
                shadow-lg
                transition-all
                hover:scale-105
              "
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};