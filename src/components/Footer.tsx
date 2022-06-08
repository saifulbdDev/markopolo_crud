
import React from 'react'

function Footer() {
    const year = new Date()

    return (
        <div className="footer">
            <span>Follow me on github </span>
            <a className="saiful" href="https://github.com/saifulbdDev">&copy; {year.getFullYear()} saifulbdDev</a>
        </div>
    )
}

export default Footer
