interface Naver{
    userid: number;
    username: string;
    email: string;
}

interface Kakao{
    userid: number;
    userName: string;
    kakaotalk: string;
    email: string;
}

interface SnsUser{
    [temp:string]:number|string; //추가 코드
    email: string;
}

const naverUser: SnsUser = {userid: 1, username: 'HH', email: 'abc@naver.com'};
const kakaoUser: SnsUser = {userid: 1, username: 'HH', kakaotalk: 'HH', email: 'abc@hanmail.net'};
