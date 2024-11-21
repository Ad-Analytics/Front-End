import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import theme from '../../theme';
import CheckoutPage from '../../pages/payment/CheckoutPage';

describe('Fluxo de Pagamento', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CheckoutPage />
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  test('deve completar fluxo de pagamento com cartão de crédito', async () => {
    renderComponent();

    // Passo 1: Revisão do pedido
    expect(screen.getByText('Plano Premium')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Ir para Pagamento'));

    // Passo 2: Formulário de pagamento
    await waitFor(() => {
      expect(screen.getByText('Forma de Pagamento')).toBeInTheDocument();
    });

    const cardNumberInput = screen.getByPlaceholderText('0000 0000 0000 0000');
    const cardNameInput = screen.getByPlaceholderText('Nome impresso no cartão');
    const expiryInput = screen.getByPlaceholderText('MM/AA');
    const cvvInput = screen.getByPlaceholderText('CVV');

    fireEvent.change(cardNumberInput, { target: { value: '4111 1111 1111 1111' } });
    fireEvent.change(cardNameInput, { target: { value: 'JOÃO SILVA' } });
    fireEvent.change(expiryInput, { target: { value: '12/25' } });
    fireEvent.change(cvvInput, { target: { value: '123' } });

    fireEvent.click(screen.getByText('Finalizar Compra'));

    // Passo 3: Confirmação
    await waitFor(() => {
      expect(screen.getByText('Pagamento Confirmado!')).toBeInTheDocument();
    });
  });

  test('deve aplicar cupom de desconto corretamente', async () => {
    renderComponent();
    
    const cupomInput = screen.getByPlaceholderText('Digite seu cupom');
    fireEvent.change(cupomInput, { target: { value: 'DESCONTO10' } });
    fireEvent.click(screen.getByText('Aplicar Cupom'));

    await waitFor(() => {
      expect(screen.getByText('Cupom aplicado com sucesso!')).toBeInTheDocument();
      expect(screen.getByText('R$ 179,91')).toBeInTheDocument(); // 10% de desconto
    });
  });
}); 