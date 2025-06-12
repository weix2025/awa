// claude-web/src/app/chat/[uuid]/page.tsx (最终动态版本)
'use client'; // 因为我们使用了 useState 和 useEffect，所以需要声明为客户端组件

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Skeleton } from "@/components/ui/Skeleton"; // 引入骨架屏组件

// 定义一下聊天记录的数据结构（可选，但推荐）
interface ChatMessage {
  uuid: string;
  text: string;
  sender: 'user' | 'assistant';
}

interface Conversation {
  uuid: string;
  name: string;
  chat_messages: ChatMessage[];
}

export default function ChatPage({ params }: { params: { uuid: string } }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.uuid) return;

    setLoading(true);
    // 动态构建请求 URL
    const apiUrl = `/api/organizations/${params.uuid}/chat_conversations/${params.uuid}.json`;

    fetch(apiUrl)
      .then(res => res.json())
      .then((data: Conversation) => {
        setConversation(data);
      })
      .catch(error => console.error("Failed to fetch conversation:", error))
      .finally(() => {
        setLoading(false);
      });
  }, [params.uuid]); // 依赖项是 params.uuid，当它变化时会重新请求

  if (loading) {
    // 显示加载中的骨架屏
    return <div className="p-4"><Skeleton className="w-full h-32" /></div>;
  }

  if (!conversation) {
    return <div className="p-4">Conversation not found.</div>;
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-xl font-bold mb-4">{conversation.name}</h1>

      {/* 消息列表区域 (动态渲染) */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {conversation.chat_messages.map((message) => (
          <Card key={message.uuid} className={message.sender === 'user' ? '' : 'bg-muted'}>
            <CardContent className="p-4 flex items-start space-x-4">
              <Avatar>
                <AvatarFallback>{message.sender === 'user' ? 'U' : 'AI'}</AvatarFallback>
              </Avatar>
              <p className="whitespace-pre-wrap">{message.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 输入框区域 */}
      <div className="mt-4 flex items-center space-x-2">
        <Textarea placeholder="Type your message here..." />
        <Button>Send</Button>
      </div>
    </div>
  );
}