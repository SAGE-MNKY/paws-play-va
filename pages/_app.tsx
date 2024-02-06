// global styles shared across the entire site
import * as React from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { BubbleChat } from 'flowise-embed-react'; // Import BubbleChat

import * as Fathom from 'fathom-client'
// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
import posthog from 'posthog-js'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import 'styles/global.css'
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import 'styles/notion.css'
// global style overrides for prism theme (optional)
import 'styles/prism-theme.css'

import { bootstrap } from '@/lib/bootstrap-client'
import {
  fathomConfig,
  fathomId,
  isServer,
  posthogConfig,
  posthogId
} from '@/lib/config'

if (!isServer) {
  bootstrap()
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  React.useEffect(() => {
    function onRouteChangeComplete() {
      if (fathomId) {
        Fathom.trackPageview()
      }

      if (posthogId) {
        posthog.capture('$pageview')
      }
    }

    if (fathomId) {
      Fathom.load(fathomId, fathomConfig)
    }

    if (posthogId) {
      posthog.init(posthogId, posthogConfig)
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [router.events])

  return (
    <>
      <BubbleChat
        chatflowid="a64d8fa7-3ab4-471e-9249-d8430f43642a"
        apiHost="https://flowise-workstation.moodmnky.com"
        theme={{
          button: {
            backgroundColor: "#F3A500",
            right: 20,
            bottom: 20,
            size: "medium",
            iconColor: "white",
            customIconSrc: "https://cdn.shopify.com/s/files/1/0693/4328/1426/files/DJ_2POM.svg",
          },
          chatWindow: {
            welcomeMessage: "Welcome back Josh! How may we be of service?",
            backgroundColor: "#2F3437",
            height: 700,
            width: 400,
            fontSize: 16,
            poweredByTextColor: "#2F3437",
            botMessage: {
              backgroundColor: "#2F3437",
              textColor: "#FFFFFF",
              showAvatar: true,
              avatarSrc: "https://cdn.shopify.com/s/files/1/0693/4328/1426/files/DJ_2POM.svg",
            },
            userMessage: {
              backgroundColor: "#F3A500",
              textColor: "#ffffff",
              showAvatar: false,
              avatarSrc: "https://cdn.discordapp.com/attachments/1083532452347269220/1194496342844776538/DALLE_2024-01-09_23.21.46_-_Design_an_esports_gaming_icon_of_a_futuristic_armored_ronin_samurai_named_Shen._The_icon_should_depict_Shen_with_only_the_lower_half_of_his_face_cov.png",
            },
            textInput: {
              placeholder: "Type your question",
              backgroundColor: "#2F3437",
              textColor: "#ffffff",
              sendButtonColor: "#F3A500",
            }
          }
        }}
      />
  <Component {...pageProps} />
  </>
  );
}

  