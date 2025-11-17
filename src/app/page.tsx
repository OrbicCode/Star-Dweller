'use client';
import { useState } from 'react';
import Image from 'next/image';
import AuthModal from '@/components/auth/AuthModal/AuthModal';
import styles from './page.module.css';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.visuallyHidden}>StarDweller</h1>
        <h2>Keep Your Eyes on the Skies</h2>
        <p>
          Manage your tasks, keep up with space news, see when the next SpaceX
          launch is and more
        </p>
        <div className={styles.btnContainer}>
          <button
            onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
            className={styles.getStartedBtn}
          >
            Get Started
          </button>
          <form>
            <button className={styles.getStartedBtn}>Skip Login</button>
          </form>
        </div>
      </div>
      <div className={styles.imageSection}>
        <div className={styles.dashboardImageContainer}>
          <Image
            src={'/dashboard-1.webp'}
            fill
            style={{ objectFit: 'cover' }}
            alt='logo'
          />
        </div>
      </div>
      <section className={styles.featureSection}>
        <h2>Stay productive in the stars</h2>
        <div className={styles.featuresContainer}>
          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              checklist
            </span>
            <h3>To-Do List</h3>
            <p className={styles.featureInfo}>
              Manage your tasks with a to-do list saved to your account
            </p>
          </div>

          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              breaking_news
            </span>
            <h3>Space News</h3>
            <p className={styles.featureInfo}>
              Get the latest news on everything related to space!
            </p>
          </div>

          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              rocket_launch
            </span>
            <h3>Next SpaceX Launch</h3>
            <p className={styles.featureInfo}>
              Want to know when the next SpaceX launch is, we&#39;ve got you
              covered
            </p>
          </div>

          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              satellite_alt
            </span>
            <h3>ISS Location</h3>
            <p className={styles.featureInfo}>
              Get the live location of the ISS so you know when to look up
            </p>
          </div>

          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              orbit
            </span>
            <h3>Who&#39;s in Space?</h3>
            <p className={styles.featureInfo}>
              See how many astronauts are in space, what their names are and
              what craft they are in
            </p>
          </div>

          <div className={styles.feature}>
            <span className={`material-symbols-outlined burger-menu`}>
              cloud_alert
            </span>
            <h3>Weather</h3>
            <p className={styles.featureInfo}>
              Grab the current weather conditions in your area. Currently set to
              London, will have local location functionality coming soon.
            </p>
          </div>

          <div className={`${styles.feature} ${styles.lastFeature}`}>
            <span className={`material-symbols-outlined burger-menu`}>
              wallpaper
            </span>
            <h3>NASA Photo of the Day</h3>
            <p className={styles.featureInfo}>
              The background is the NASA APOD (photo of the day) giving you a
              fresh feel every day that you open Star Dweller.
            </p>
          </div>
        </div>
      </section>
      {isAuthModalOpen && (
        <AuthModal onClose={() => setIsAuthModalOpen(false)} />
      )}
    </div>
  );
}
