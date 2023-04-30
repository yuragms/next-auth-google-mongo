import Head from 'next/head';
import React, { useState } from 'react';
import Layout from '../layout/layout';
import Link from 'next/link';
import styles from '../styles/Form.module.css';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useFormik } from 'formik';

export default function Login() {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  //Google Handler function

  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: 'http://localhost:3000' });
  }
  //GitHub Handler function

  async function handleGithubSignin() {
    signIn('github', { callbackUrl: 'http://localhost:3000' });
  }
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectrtur adipisicing elit. Dolores,
            officia
          </p>
        </div>
        {/*form */}
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.input_text}
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          <div className={styles.input_group}>
            <input
              type={`${show ? 'text' : 'password'}`}
              name="password"
              placeholder="Password"
              className={styles.input_text}
              {...formik.getFieldProps('password')}
            />
            <span
              className="icon flex items-center px-4"
              onClick={() => setShow(!show)}
            >
              <HiFingerPrint size={25} />
            </span>
          </div>
          {/*login button */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGoogleSignin}
            >
              <FcGoogle size={20} />
              Sign In With Google
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGithubSignin}
            >
              <div>
                <FaGithub size={20} />
              </div>
              Sign In With GitHub
            </button>
          </div>
        </form>
        {/*bottom */}
        <p className="text-center text-gray-400">
          don't have an account yet?
          <Link href={'/register'} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}
