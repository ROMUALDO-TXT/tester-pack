import React, { useState } from 'react';
import axios, { Method } from 'axios';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Alert,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home as HomeIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

const methods: Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export const RestDashboard: React.FC = () => {
  const [method, setMethod] = useState<Method>('GET');
  const [url, setUrl] = useState<string>('');
  const [headers, setHeaders] = useState<string>('{}');
  const [body, setBody] = useState<string>('{}');
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <Box maxWidth="md" mx="auto">
      <Paper elevation={3} sx={{ p: 4, flexGrow: 1 }}>
        {/* URL and Method */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <TextField
            select
            label="Method"
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            sx={{ width: '150px' }}
          >
            {methods.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="API URsL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter API URLsss"
          />
        </Box>

        {/* Headers */}
        <Box mb={3}>
          <TextField
            label="Headers (JSON)"
            multiline
            rows={4}
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            fullWidth
            placeholder='{"Content-Type": "application/json"}'
          />
        </Box>

        {/* Body */}
        {['POST', 'PUT', 'PATCH'].includes(method) && (
          <Box mb={3}>
            <TextField
              label="Body (JSON)"
              multiline
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              fullWidth
              placeholder='{"key": "value"}'
            />
          </Box>
        )}

        {/* Send Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendRequest}
        >
          Send Request
        </Button>
      </Paper>

      {/* Response */}
      {response && (
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Typography variant="h6" mb={2}>
            Response:
          </Typography>
          <pre
            style={{
              backgroundColor: '#f4f4f4',
              padding: '10px',
              borderRadius: '5px',
              overflow: 'auto',
              maxHeight: '300px',
            }}
          >
            {response}
          </pre>
        </Paper>
      )}

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};
