import cors from 'cors'
export const corsSite = (): void => {
  cors({
    origin: 'https://edmopuc.online'
  })
}
