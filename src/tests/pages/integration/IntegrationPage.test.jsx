import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../../theme';
import IntegrationPage from '../../../pages/integration/components/IntegrationPage';

describe('IntegrationPage', () => {
  const renderComponent = () => {
    return render(
      <ThemeProvider theme={theme}>
        <IntegrationPage />
      </ThemeProvider>
    );
  };

  test('deve renderizar corretamente', () => {
    renderComponent();
    expect(screen.getByText('Integração de Plataformas')).toBeInTheDocument();
    expect(screen.getByText('Google Ads')).toBeInTheDocument();
    expect(screen.getByText('Meta Ads')).toBeInTheDocument();
  });

  test('deve validar token do Google Ads corretamente', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('XXXX-XXXX-XXXX-XXXX');
    
    fireEvent.change(input, { target: { value: 'ABCD-1234-EFGH-5678' } });
    expect(screen.queryByText('Token do Google Ads inválido')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'invalid-token' } });
    expect(screen.getByText(/Token do Google Ads inválido/)).toBeInTheDocument();
  });

  test('deve validar token do Meta Ads corretamente', async () => {
    renderComponent();
    const input = screen.getByPlaceholderText('EAAxxxxxxxx...');
    
    fireEvent.change(input, { target: { value: 'EAA' + 'x'.repeat(150) } });
    expect(screen.queryByText('Token do Meta Ads inválido')).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'invalid-token' } });
    expect(screen.getByText(/Token do Meta Ads inválido/)).toBeInTheDocument();
  });

  test('deve testar conexão corretamente', async () => {
    renderComponent();
    const googleInput = screen.getByPlaceholderText('XXXX-XXXX-XXXX-XXXX');
    const testButton = screen.getAllByText('Testar Conexão')[0];

    fireEvent.change(googleInput, { target: { value: 'ABCD-1234-EFGH-5678' } });
    fireEvent.click(testButton);

    await waitFor(() => {
      expect(screen.getByText('Conexão testada com sucesso!')).toBeInTheDocument();
    });
  });
}); 