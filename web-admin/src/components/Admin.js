import React from 'react'

export default function admin() {
    return (
        <div>
            {(localStorage.getItem("token") == null ) ? (
                <h1>Bạn Chưa đăng Nhập</h1>
            ) :(
                <h1> welcome to admin</h1>
            )}
        </div>
    )
}
