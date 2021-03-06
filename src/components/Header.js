import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../content/ThemeContext";
import styles from "./Header.module.css";

function Header() {
    const headerContentList = ['home', 'blog', 'project', 'service']
    const headerImageList   = { themeLogo: '/theme-logo.png', themeBar: '/theme-bar.svg', themeLight: '/theme-light.svg', themeDark: '/theme-dark.svg', themeSearch: '/theme-search.svg' }

    const [theme, toggleTheme] = useContext(ThemeContext)

    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        if ( scrollY === -100 ) {
            document.querySelector('header').className = ''
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }

        if ( scrollY === 100 ) {
            document.querySelector('header').className = styles.sticky
            window.scrollTo({
                top: 900,
                behavior: 'smooth'
            })
        }
        
    }, [scrollY])

    useEffect(() => {
        setScrollY(document.documentElement.scrollTop == 0 ? 0 : 100)
    }, [])

    useEffect(() => {
        window.addEventListener('wheel', (e) => setScrollY(e.deltaY))
    })

    return ( 
        <header>
            <div>
                <img alt='logo' src={ headerImageList.themeLogo } />
                { headerContentList.map((content) => (
                    <div key={ content } className={ styles.themeMenuDesktop }>
                        <Link to={ '/' + (content === 'home' ? '' : content) }>
                            { content.charAt(0).toUpperCase() + content.slice(1) }
                        </Link>
                    </div>
                ) ) }
            </div>

            <div>
                <div className={ styles.themeMenuDesktop }>
                    <img alt='theme' 
                        src={ headerImageList[theme] } 
                        className={ styles[theme] }
                        onClick={ toggleTheme } />
                </div>

                <div className={ styles.themeMenuDesktop }>
                    <img alt='search' src={ headerImageList.themeSearch } className={ styles.themeSearch } />
                </div>

                <div className={ styles.themeMenuMobile }>
                    <img alt='bar' src={ headerImageList.themeBar } className={ styles.themeSearch } />
                </div>
            </div>
        </header>
    )
}
export default Header