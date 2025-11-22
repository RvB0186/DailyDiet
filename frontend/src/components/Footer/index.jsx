import styled from 'styled-components';
import { FacebookLogo, TwitterLogo, LinkedinLogo, Phone, Envelope } from 'phosphor-react';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  color: ${({ theme }) => theme.COLORS.WHITE};
  padding: 0.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto; /* Garante que fique no fundo se o pai for flex */
  width: 100%;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;

  a {
    background-color: ${({ theme }) => theme.COLORS.WHITE};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 0.2s;
    text-decoration: none;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const InfoText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    margin: 0;
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`;

const ContactRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const LogoText = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export function Footer() {
  return (
    <FooterContainer>
        <LogoText>
             Daily Diet
        </LogoText>
      <SocialIcons>
        <a href="#" target="_blank" rel="noreferrer">
          <FacebookLogo size={28} color="#333638" weight="fill" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <TwitterLogo size={28} color="#333638" weight="fill" />
        </a>
        <a href="#" target="_blank" rel="noreferrer">
          <LinkedinLogo size={28} color="#333638" weight="fill" />
        </a>
      </SocialIcons>

      <InfoText>
        <p>250 Executive Park Blvd, Suite 3400 • San Francisco CA 94134 • United States</p>
        
        <ContactRow>
          <div>
            <Phone size={20} />
            <span>+ 123-456-789</span>
          </div>
          <div>
            <Envelope size={20} />
            <span>contact@dailydiet.com</span>
          </div>
        </ContactRow>
      </InfoText>


    </FooterContainer>
  );
}