import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { User } from '@/types/user';
import { dayjs } from '@/lib/dayjs';

import type { Message } from './types';

const user = {
  id: 'USR-000',
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  email: 'sofia@devias.io',
} satisfies User;

export interface MessageBoxProps {
  message: Message;
}

export function MessageBox({ message }: MessageBoxProps): React.JSX.Element {
  const position = message.author.id === user.id ? 'right' : 'left';

  return (
    <>
      <Box sx={{ alignItems: position === 'right' ? 'flex-end' : 'flex-start', flex: '0 0 auto', display: 'flex' }}>
        <Stack
          direction={position === 'right' ? 'row-reverse' : 'row'}
          spacing={2}
          sx={{
            alignItems: 'flex-start',
            maxWidth: '500px',
            ml: position === 'right' ? 'auto' : 0,
            mr: position === 'left' ? 'auto' : 0,
          }}
        >
          {/* <Avatar src={message.author.avatar} sx={{ '--Avatar-size': '32px' }} /> */}
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <Card
              sx={{
                px: 2,
                py: 1,
                background: '#F1F1F4',
                borderRadius: '8px',
                lineHeight: '150%',
                color: '#212636',

                ...(position === 'right' && {
                  bgcolor: '#CCFBEF',
                }),
              }}
            >
              <Stack spacing={1}>
                {/* <div>
                <Link color="inherit" sx={{ cursor: 'pointer' }} variant="subtitle2">
                  {message.author.name}
                </Link>
              </div> */}
                {/* {message.type === 'image' ? (
                <CardMedia
                  image={message.content}
                  onClick={() => {
                    // open modal
                  }}
                  sx={{ height: '200px', width: '200px' }}
                />
              ) : null} */}
                {message.type === 'text' ? (
                  <Typography color="inherit" variant="body1" p="0 40px 0 0">
                    {message.content}
                  </Typography>
                ) : null}
              </Stack>
              <Typography
                color="text.secondary"
                noWrap
                variant="caption"
                textAlign="right"
                display="block"
                fontSize={10}
              >
                {dayjs(message.createdAt).fromNow()}
              </Typography>
            </Card>
            {/* <Box sx={{ display: 'flex', justifyContent: position === 'right' ? 'flex-end' : 'flex-start', px: 2 }}>
            <Typography color="text.secondary" noWrap variant="caption">
              {dayjs(message.createdAt).fromNow()}
            </Typography>
          </Box> */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
