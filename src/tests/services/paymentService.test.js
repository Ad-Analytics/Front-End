import axios from 'axios';
import { processPayment, generatePixCode, generateBoleto } from '../../services/paymentService';

jest.mock('axios');

describe('Payment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve processar pagamento com sucesso', async () => {
    const mockResponse = { data: { success: true, orderId: '123456' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const paymentData = {
      amount: 199.90,
      method: 'credit_card',
      card: {
        number: '4111111111111111',
        name: 'JOÃO SILVA',
        expiry: '12/25',
        cvv: '123'
      }
    };

    const result = await processPayment(paymentData);
    expect(result).toEqual(mockResponse.data);
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), paymentData);
  });

  test('deve gerar código PIX com sucesso', async () => {
    const mockResponse = { data: { pixCode: '00020126580014br.gov.bcb.pix' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await generatePixCode('123456');
    expect(result).toEqual(mockResponse.data);
  });

  test('deve gerar boleto com sucesso', async () => {
    const mockResponse = { data: { boletoCode: '34191.79001 01043.510047' } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const result = await generateBoleto('123456');
    expect(result).toEqual(mockResponse.data);
  });
}); 