//Styles
import './style.css'

//Localization
import { withTranslation } from "react-i18next";

//Local Type Props
type HeaderProps = {
    t: (label: string) => string
}

//Component
const Header = (props: HeaderProps) => {
    const { t } = props;
    return (
        <div className='header-container' data-testid='header-text'>
            {t('headerTitle')}
        </div>
    )
}

export default withTranslation('translations')(Header);