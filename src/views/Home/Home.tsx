import PrimaryButton from '../../components/Buttons/PrimaryButton'
import SecondaryButton from '../../components/Buttons/SecondaryButton'
import styles from './Home.module.scss'

const Home = () => {
  


  return (
    <div className= {`${styles.mainLayout} container`} >
      <section className={styles.heroSection}>
        <div className={styles.heroImage}>
          <img src="/images/ingredients-cut.png" alt="hero image" />
        </div>
        <div className={`${styles.heroContent}`}>
          <h1>
            Welcome to <span className={styles.highlightText}>NutriPlan</span>
          </h1>
          <p>Your tool to plan meals, explore recipes, and stay in control of your nutrition.</p>
          <div className={styles.buttonGroup}>
            <SecondaryButton
              text='Login'
            />
            <PrimaryButton 
              text='Create account'
              type='button'
            />
          </div>
        </div>
      </section>
      <section className= {`${styles.featuresSection}`}>
        <div className={styles.featuresContent}>
          <div className={styles.freeBadge}>
            <span>100% Free</span>
            <img src="/images/fruits-composition-isolated.png" alt="100% free" />
          </div>
          <h3>What can you do with NutriPlan?</h3>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <h4 className={styles.featureTitle}>
                📅 Placweek
              </h4>
              <p className={styles.featureText}>
                Organize your meals for the week in a flexible and easy way.
              </p>
            </li>
            <li className={styles.featureItem}>
              <h4 className={styles.featureTitle}>
                <img src="" alt="" />
                📊 Track your nutrients with visual insights
              </h4>
              <p className={styles.featureText}>
                Monitor key nutrients like salt or cholesterol and see your daily and weekly progress in charts.
              </p>
            </li>
            <li className={styles.featureItem}>
              <h4 className={styles.featureTitle}>
                <img src="" alt="" />
                🍲 Save your favorite recipes
              </h4>
              <p className={styles.featureText}>
                Keep your go-to meals and recipes for quick access.
              </p>
            </li>
            <li className={styles.featureItem}>
              <h4 className={styles.featureTitle}>
                <img src="" alt="" />
                📖 Get helpful recommendations
              </h4>
              <p className={styles.featureText}>
                Access general guidance based on your personal data (optional).            
              </p>
            </li>
          </ul>
        </div>
      </section> 
    </div>
  )
}

export default Home