import { auth } from '@/firebase';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaGoogle, FaMicrosoft, FaPhone } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import FillLoading from '../shared/fill-loading';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const Social = () => {
  const [yuklanmoqda, yuklanmoqdaBelgilash] = useState(false);
  const yoʻnaltir = useNavigate();
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  // reCAPTCHA sozlash
  useEffect(() => {
    recaptchaVerifier.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
      },
    });

    return () => {
      recaptchaVerifier.current?.clear();
    };
  }, []);

  const googleOrqaliKirish = async () => {
    yuklanmoqdaBelgilash(true);
    const googleProvayder = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvayder);
      yoʻnaltir('/');
    } finally {
      yuklanmoqdaBelgilash(false);
    }
  };

  const githubOrqaliKirish = async () => {
    yuklanmoqdaBelgilash(true);
    const githubProvayder = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, githubProvayder);
      yoʻnaltir('/');
    } finally {
      yuklanmoqdaBelgilash(false);
    }
  };

  const microsoftOrqaliKirish = async () => {
    yuklanmoqdaBelgilash(true);
    const microsoftProvayder = new OAuthProvider('microsoft.com');
    try {
      await signInWithPopup(auth, microsoftProvayder);
      yoʻnaltir('/');
    } finally {
      yuklanmoqdaBelgilash(false);
    }
  };

  const phoneOrqaliKirish = async () => {
    yuklanmoqdaBelgilash(true);
    try {
      const phoneNumber = prompt('Telefon raqamingizni kiriting (+998)');
      if (!phoneNumber || !recaptchaVerifier.current) return;

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
      const verificationCode = prompt('SMS orqali kelgan kodni kiriting');

      if (verificationCode) {
        await confirmationResult.confirm(verificationCode);
        yoʻnaltir('/');
      }
    } catch (error) {
      console.error('Telefon orqali kirishda xato:', error);
    } finally {
      yuklanmoqdaBelgilash(false);
    }
  };

  return (
    <>
      {yuklanmoqda && <FillLoading />}
      <div id="recaptcha-container"></div>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2">
        <Button className="h-12" variant="secondary" onClick={githubOrqaliKirish} disabled={yuklanmoqda}>
          <FaGithub className="mr-2" />
          <span>GitHub orqali kirish</span>
        </Button>
        <Button className="h-12" variant="destructive" onClick={googleOrqaliKirish} disabled={yuklanmoqda}>
          <FaGoogle className="mr-2" />
          <span>Google orqali kirish</span>
        </Button>
        <Button className="h-12" variant="destructive" onClick={microsoftOrqaliKirish} disabled={yuklanmoqda}>
          <FaMicrosoft className="mr-2" />
          <span>Microsoft orqali kirish</span>
        </Button>
        <Button className="h-12" variant="destructive" onClick={phoneOrqaliKirish} disabled={yuklanmoqda}>
          <FaPhone className="mr-2" />
          <span>Phone orqali kirish</span>
        </Button>
      </div>
    </>
  );
};

export default Social;

