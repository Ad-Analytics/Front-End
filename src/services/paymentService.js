import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/payments`, paymentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao processar pagamento');
  }
};

export const generatePixCode = async (orderId) => {
  try {
    const response = await axios.post(`${API_URL}/payments/pix`, { orderId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao gerar código PIX');
  }
};

export const generateBoleto = async (orderId) => {
  try {
    const response = await axios.post(`${API_URL}/payments/boleto`, { orderId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao gerar boleto');
  }
};

export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(`${API_URL}/payments/${paymentId}/status`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao verificar status do pagamento');
  }
};