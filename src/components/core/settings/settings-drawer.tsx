'use client';

import * as React from 'react';
import { Box, Button, CardMedia } from '@mui/material';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { margin } from '@mui/system';
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import '@sendbird/uikit-react/dist/index.css';

import type { Settings } from '@/types/settings';

export interface SettingsDrawerProps {
  canReset?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  onUpdate?: (settings: Partial<Settings>) => void;
  open?: boolean;
  values?: Partial<Settings>;
}

export function SettingsDrawer({
  canReset = true,
  onClose,
  onUpdate,
  onReset,
  open,
  values = {},
}: SettingsDrawerProps): React.JSX.Element {
  const [startChatState, setStartChatState] = React.useState<boolean>(false);

  const handleChange = React.useCallback(
    (field: keyof Settings, value: unknown) => {
      onUpdate?.({ [field]: value });
    },
    [onUpdate]
  );

  return (
    <Drawer
      ModalProps={{ BackdropProps: { invisible: true }, sx: { zIndex: 1400 } }}
      PaperProps={{
        elevation: 24,
        sx: { display: 'flex', flexDirection: 'column', maxWidth: '100%', width: '400px', background: '#fffdf5' },
      }}
      anchor="right"
      disableScrollLock
      onClose={onClose}
      open={open}
    >
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2 }}>
      <IconButton onClick={()=>setStartChatState(false)}>
            <img src="/clientSideImages/minusDrawer.svg" alt="minusDrawer" width={15} height={15} />
          </IconButton>
        <img src="/clientSideImages/wingmanLogo.svg" alt="wingmanLogo" width={146} height={31} />

        {/* <Typography variant="h6">App settings</Typography> */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          {/* <Badge
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            color="error"
            sx={{ '& .MuiBadge-badge': { top: 6, right: 6, ...(!canReset && { display: 'none' }) } }}
            variant="dot"
          >
            <IconButton onClick={onReset}>
              <ArrowCounterClockwiseIcon />
            </IconButton>
          </Badge> */}
          <IconButton onClick={onClose}>
            <img src="/clientSideImages/minusDrawer.svg" alt="minusDrawer" width={15} height={15} />
          </IconButton>
        </Stack>
      </Stack>
      {!startChatState ? (
        <>
          <Stack padding="24px" className="expertConsult" position="relative" minHeight={500}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '21px' }}>
              <Typography fontSize={32} color="#fff" position="relative">
                Talk to a Wingman!
              </Typography>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '22px' }}
                position="relative"
              >
                <Box sx={{ display: 'flex', gap: '13px' }}>
                  <img src="/clientSideImages/expertsPeoples.png" alt="expertsPeoples" width={130} height={30} />
                  <Typography
                    borderRadius="100px"
                    display="flex"
                    alignItems="center"
                    color="#16A093"
                    padding="2px 7px"
                    fontSize={12}
                    className="onlineCount"
                  >
                    24+ Experts Online
                  </Typography>
                </Box>
                <Typography color="#fff" fontSize={16} lineHeight="120%" fontWeight={500} letterSpacing="-0.16px">
                  Consult community product experts for personalized shopping advice.
                </Typography>
              </Box>
            </Box>
          </Stack>
          <Stack sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }} margin="36px">
            <Box border=" 1px solid #8A94A6" borderRadius="8px" padding="22px">
              <Box display="flex" gap="8px">
                {' '}
                <img src="/clientSideImages/phoneCall.svg" alt="phoneCall" width={24} height={24} />
                <Box>
                  <Button>
                    <Typography
                      fontSize={18}
                      color="#0E9382"
                      fontWeight={500}
                      letterSpacing="-0.16px"
                      lineHeight="100%"
                    >
                      Start Live Call
                    </Typography>
                  </Button>
                  <Typography fontSize={12} color="#667085" fontWeight={500} margin="8px 0 0" lineHeight="166%">
                    Speak to an expert & clarify all your doubts. Take as much time as you want.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box border=" 1px solid #8A94A6" borderRadius="8px" padding="22px">
              <Box display="flex" gap="8px">
                {' '}
                <img src="/clientSideImages/chatsTeardrop.svg" alt="chatsTeardrop" width={24} height={24} />
                <Box>
                  <Button onClick={() => setStartChatState(true)}>
                    <Typography
                      fontSize={18}
                      color="#0E9382"
                      fontWeight={500}
                      letterSpacing="-0.16px"
                      lineHeight="100%"
                    >
                      Start Chat
                    </Typography>
                  </Button>
                  <Typography fontSize={12} color="#667085" fontWeight={500} margin="8px 0 0" lineHeight="166%">
                    Text instantly, get answers to your queries & quickly make your decision.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
        </>
      ) : (
     
          <SendbirdProvider appId={process.env.NEXT_PUBLIC_SENDBIRD_APP_ID!} userId="demo-client">
            <GroupChannel
              channelUrl="sendbird_group_channel_248464089_60e521506458d7d08b2babaa87d7d6e6fc83a8ed"
              renderChannelHeader={() => <>{null}</>}
              // renderMessageContent={() => <>{null}</>}
              // renderSuggestedReplies={renderSuggestedReplies}
            />
          </SendbirdProvider>
        
      )}

      <Stack padding="12px 0" textAlign="center" sx={{ background: '#F9FAFB' }}>
        <Typography
          fontSize={12}
          color="#8A94A6"
          letterSpacing=".4px"
          lineHeight="20px"
          sx={{ cursor: 'pointer', width: 'fit-content', margin: 'auto' }}
        >
          Terms & Conditions
        </Typography>
      </Stack>
    </Drawer>
  );
}
