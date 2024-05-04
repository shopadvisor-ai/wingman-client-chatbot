'use client';

import * as React from 'react';
import { Button } from '@mui/base';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { borderRadius } from '@mui/system';

import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';
import type { Message, MessageType, Thread, ThreadType } from './types';

/**
 * This method is used to get the thread from the context based on the thread type and ID.
 * The thread should be loaded from the API in the page, but for the sake of simplicity we are just using the context.
 */
function useThread(threadId: string): Thread | undefined {
  const { threads } = React.useContext(ChatContext);

  return threads.find((thread) => thread.id === threadId);
}

function useMessages(threadId: string): Message[] {
  const { messages } = React.useContext(ChatContext);

  return messages.get(threadId) ?? [];
}

export interface ThreadViewProps {
  threadId: string;
  threadType: ThreadType;
}

export function ThreadView({ threadId }: ThreadViewProps): React.JSX.Element | null {
  const { createMessage, markAsRead } = React.useContext(ChatContext);

  const thread = useThread(threadId);

  const messages = useMessages(threadId);

  const messagesRef = React.useRef<HTMLDivElement>(null);

  const handleThreadChange = React.useCallback(() => {
    markAsRead(threadId);
  }, [threadId, markAsRead]);

  React.useEffect(() => {
    handleThreadChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite loop
  }, [threadId]);

  const handleSendMessage = React.useCallback(
    async (type: MessageType, content: string) => {
      createMessage({ threadId, type, content });
    },
    [threadId, createMessage]
  );

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (!thread) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
        <Typography color="textSecondary" variant="h6">
          Thread not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <ThreadToolbar thread={thread} />
      {/* Fran wants to start a live call section */}

      <Box sx={{ background: '#062E23', p: '50px 18px' }}>
        <Box sx={{ background: '#F0FDFA', p: '16px', boxShadow: '0px 1px 2px 0px #00000014', borderRadius: '8px' }}>
          <Typography fontSize={16} lineHeight="150%" letterSpacing="-.16px" color="#212636">
            Fran wants to start a live call.
          </Typography>
          <Typography fontSize={12} lineHeight="166%" color="#667085" m="4px 0 0">
            Your camera will remain off by default.
          </Typography>
          <Box fontSize={13} lineHeight="22px" color="#fff" letterSpacing=".2px" m="15px 0 0" display="flex">
            <Box
              sx={{
                background: '#DE3024',
                borderRadius: '8px',
                border: '1px solid #0E9382',
                boxShadow: '0px 1px 2px 0px #00000014',
                p: '3px 10px',
                cursor: 'pointer',
              }}
              border="0px solid #0E9382"
            >
              Accept
            </Box>
            <Box
              sx={{
                background: '#0E9382',
                borderRadius: '8px',
                border: '1px solid #0E9382',
                boxShadow: '0px 1px 2px 0px #00000014',
                p: '3px 10px',
                m: '0 0 0 15px',
                cursor: 'pointer',
              }}
              border="0px solid #0E9382"
            >
              Reject
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Fran wants to start a live call section */}
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3, background: '#FFFDF5' }}>
        <Typography fontSize={12} lineHeight="166%" color="#667085" textAlign="center" m="0 0 15px 0">
          You can send messages while we find your Wingman.
        </Typography>

        {/* conect with expert */}

        <Stack
          sx={{
            background: 'linear-gradient(0deg, #FBF2CE -4.75%, #FCF8E9 108%)',
            boxShadow: '0px 6px 12px 0px #0000001A',
            borderRadius: '13px',
            p: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '21px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <Box display="flex">
              <img
                style={{ borderRadius: '40px' }}
                src="/assets/avatar-10.png"
                alt="wingmanLogo"
                width={40}
                height={40}
              />
              <Box p="0 0 0 12px">
                <Typography fontSize={24} color="#212636" lineHeight="120%" letterSpacing="-0.32px" fontWeight={500}>
                  Hi, I’m Fran
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box display="flex">
                    <img src="/clientSideImages/fillStar.svg" alt="fillStar" width={12} height={12} />
                    <img src="/clientSideImages/fillStar.svg" alt="fillStar" width={12} height={12} />
                    <img src="/clientSideImages/fillStar.svg" alt="fillStar" width={12} height={12} />
                    <img src="/clientSideImages/fillStar.svg" alt="fillStar" width={12} height={12} />
                    <img src="/clientSideImages/blankStar.svg" alt="fillStar" width={12} height={12} />
                  </Box>
                  <Typography fontSize={12} color="#667085" lineHeight="166%" p="0 0 0 4px">
                    4 Stars
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography fontSize={14} color="#212636" lineHeight="157%" letterSpacing="-1%" fontWeight={500}>
              I am a musician, DJ, & visual artist. I love helping people find their best audio tools to listen to all
              the beautiful noises around us.{' '}
            </Typography>
          </Box>
          <Box fontSize={10} color="#fff" lineHeight="20px" letterSpacing=".14px%" fontWeight={600} display="flex">
            <Box sx={{ background: '#15B79F', p: '2px 8px', borderRadius: '100px' }}>Club DJ</Box>
            <Box sx={{ background: '#635BFF', p: '2px 8px', borderRadius: '100px', m: '0 0 0 12px' }}>Music Expert</Box>
          </Box>
        </Stack>
        {/* conect with expert */}

        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Stack>
      <MessageAdd onSend={handleSendMessage} />
    </Box>
  );
}
