"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function RegisterModal({ isOpen, onClose, onLoginClick }: RegisterModalProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined
        },
        formData.password
      );

      if (result.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: ''
        });
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте снова позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Регистрация</DialogTitle>
          <DialogDescription>
            Создайте новый аккаунт для заказа продуктов
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              name="name"
              placeholder="Иван Иванов"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@mail.ru"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+7 (999) 123-45-67"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Минимум 6 символов"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Повторите пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Уже есть аккаунт?</p>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-green-600"
              onClick={() => {
                onClose();
                onLoginClick();
              }}
            >
              Войти
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
