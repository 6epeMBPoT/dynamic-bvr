import styles from '@/app/styles/main.module.css';
import styles_home from '@/app/styles/home.module.css';

const Main = () => {
    return (
        <main className={styles.main}>
            <div className={styles_home.child}>
                <h1 style={{ margin: 0 }}>беретврот.рф</h1>
                <h2 style={{ marginTop: '.5rem' }}>Навигатор</h2>

                <a href='/random' className={styles_home.link}>Случайный домен</a>
                <p>Для регистрация желаемого домена третьего уровня введите его в поисковую строку.</p>
            </div>
        </main>
    );
}

export default Main;