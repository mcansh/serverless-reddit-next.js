import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { Form } from './search';

import Karma from '~/public/static/img/icons/karma.svg';
import Reddit from '~/public/static/img/reddit.svg';

const HeaderStyles = styled.header.attrs({ className: 'header' })`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  background-color: var(--reverse-default);
  position: fixed;
  width: 100%;
  z-index: ${props => props.theme.zIndexHeader};
  border-bottom: 1px solid var(--background-color);
  top: 0;
  left: 0;
  padding: 0 2rem;

  @media (display-mode: standalone) {
    height: calc(env(safe-area-inset-top) + 80px);
    padding-top: env(safe-area-inset-top);
  }

  .header__logo-container {
    max-width: 100px;
    height: auto;
    display: block;
    text-decoration: none;

    svg {
      height: 100%;
      width: 100%;
    }
  }

  .header__search-container {
    display: none;
  }

  .header__search {
    --placeholder-color: rgba(0, 0, 0, 0.54);
    appearance: none;
    background: var(--background-color);
    border: 1px solid var(--background-color);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 14px;
    font-size: 14px;
    min-width: 400px;
    height: 40px;
    color: var(--default);
    outline: none;

    @media (prefers-color-scheme: dark) {
      --placeholder-color: rgba(255, 255, 255, 0.54);
    }

    ::placeholder {
      color: var(--placeholder-color);
    }

    &:hover,
    &:focus {
      border-color: var(--search-border);
    }
  }

  .header__user-area {
    display: flex;
    align-items: center;
    text-align: left;
    line-height: 15px;
  }

  .header__username {
    color: var(--default);
  }

  .header__karma-container {
    display: flex;
    align-items: center;
  }

  .header__karma-thing {
    width: 10px;
    height: 10px;
    margin-right: 6px;
  }

  .header__karma-thing path {
    fill: #ff4500;
  }

  .header__karma-counter {
    line-height: normal;
    font-size: 12px;
    color: #999999;
  }

  .header__avatar-container {
    width: 30px;
    height: 30px;
    margin-left: 20px;
    position: relative;
  }

  .header__avatar {
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: block;
  }

  .header form {
    margin: 0;
  }

  @media (min-width: 768px) {
    .header__search-container {
      display: block;
    }

    .header__user-area {
      margin-left: initial;
    }
  }
`;

const Header = () => {
  const {
    query: { subreddit, sort, t: time, ...query },
  } = useRouter();

  return (
    <HeaderStyles>
      <Link href={{ pathname: '/', query }}>
        <a
          aria-label="Reddit"
          className="header__logo-container"
          onContextMenu={event => {
            event.preventDefault();
            location.assign(process.env.REPO);
          }}
        >
          <Reddit
            css={{
              'g g': {
                fill: 'black',
                '@media (prefers-color-scheme: dark)': {
                  fill: '#D7DADC',
                },
              },
            }}
          />
        </a>
      </Link>
      <div className="header__search-container">
        <Form />
      </div>
      <div className="header__user-area">
        <div>
          <div className="header__username">evilrabbit</div>
          <div className="header__karma-container">
            <Karma />
            <div className="header__karma-counter">1 karma</div>
          </div>
        </div>
        <div className="header__avatar-container">
          <picture>
            <source srcSet="/static/img/evilrabbit_.webp" type="image/webp" />
            <source srcSet="/static/img/evilrabbit_.jpeg" type="image/jpeg" />
            <img
              className="header__avatar"
              alt="Evil Rabbit"
              src="/static/img/evilrabbit_.jpeg"
              importance="low"
            />
          </picture>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
