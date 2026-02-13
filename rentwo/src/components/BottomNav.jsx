import './BottomNav.css'

const TABS = [
    { key: 'Swipe', label: '👥' },
    { key: 'Explore', label: '🔎' },
    { key: 'Likes', label: '👍🏽'},
    { key: 'MyProperties', label: '🏡' },
    
]

export default function BottomNav({ activateTab = 'Swipe', onTabChange = () => {} }) {
    return (
        <nav className='bottomNav' aria-label='Bottom navigation'>
            {TABS.map((t) => (
                <button
                    key={t.key}
                    className={`bottomNav__item ${activateTab === t.key ? 'is-active' : ''}`}
                    onClick={() => onTabChange(t.key)}
                    type='button'
                >
                    <span className='bottomNav__label'>{t.label}</span>
                </button>
            ))}
        </nav>
    )
}