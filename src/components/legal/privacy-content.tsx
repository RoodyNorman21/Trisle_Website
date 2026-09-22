import {
  A,
  B,
  H2,
  H3,
  LI,
  Note,
  P,
  Table,
  UL,
} from "@/components/legal/legal-ui";

/**
 * Privacy Policy content (governing English version).
 * Facts locked to the product reality: GA4 consent-gated on the website,
 * 100% on-device app processing, Polar.sh as merchant of record.
 */

export function PrivacyContent() {
  return (
    <>
      <H2 id="scope">1. Scope of this policy</H2>
      <P>
        This Privacy Policy explains how the Trisle website
        (&ldquo;<B>Website</B>&rdquo;, published at
        trisle-app.github.io/Trisle_Website) and the Trisle Android
        application (&ldquo;<B>App</B>&rdquo;) handle information, and the
        rights you have in relation to that information. It applies to every
        visitor to the Website, every customer who purchases the App, and
        every user of the App, regardless of where you are located. It is
        written to satisfy the information duties of Articles 13 and 14 of
        the EU General Data Protection Regulation (&ldquo;
        <B>GDPR</B>&rdquo;) and, to the extent applicable, equivalent laws
        such as the UK GDPR and the Swiss Federal Act on Data Protection.
      </P>
      <P>
        If any translated version of this policy (where one is made
        available) conflicts with this English version, the English version
        governs.
      </P>

      <H2 id="controller">2. Who is responsible (the &ldquo;controller&rdquo;)</H2>
      <P>
        The controller for the data processing described in this policy is
        the operator of Trisle (&ldquo;<B>Operator</B>&rdquo;,
        &ldquo;<B>we</B>&rdquo;, &ldquo;<B>us</B>&rdquo;), an independent
        software developer publishing the Website and the App under the
        &ldquo;Trisle&rdquo; name. You can reach us at any time through the
        channels listed in <A href="#contact">section 15 (Contact)</A>.
      </P>
      <Note>
        Trisle is a product of an independent developer. It is not
        affiliated with, endorsed by, or sponsored by Apple Inc. or Google
        LLC. All third-party trademarks belong to their respective owners.
      </Note>

      <H2 id="app">3. The Trisle App — data stays on your device</H2>
      <P>
        The App is designed to process everything locally on your device.
        The content of your notifications, your music, battery level,
        locations inside navigation islands, and everything else the App
        displays never leaves your phone: the App has no servers, no user
        accounts, and no cloud sync. Specifically:
      </P>
      <UL>
        <LI>
          <B>No telemetry.</B> The App does not embed third-party analytics,
          advertising, crash-reporting or tracking SDKs, and it does not
          transmit usage statistics anywhere.
        </LI>
        <LI>
          <B>No accounts.</B> You do not create a profile, and we do not
          receive your name, email address, or contacts through the App.
        </LI>
        <LI>
          <B>Permissions, and why.</B> The App requests two standard
          Android permissions: <B>notification listener access</B> (so
          islands can mirror notifications that arrive on your device) and{" "}
          <B>&ldquo;display over other apps&rdquo;</B> (so islands can float
          above the interface). Both are granted by you in Android settings,
          are used exclusively for the on-screen feature they enable, and can
          be revoked at any time, which simply disables the related feature.
        </LI>
        <LI>
          <B>No root, no data export.</B> The App does not require rooting
          and does not read, collect, or forward your files, contacts,
          messages, or precise location.
        </LI>
      </UL>
      <Note>
        If you contact us for App support, we process only what you choose
        to send us in that conversation (see section 4.4). Screenshots you
        share voluntarily should be stripped of personal content before
        sending.
      </Note>

      <H2 id="website-data">4. Information the Website processes</H2>
      <H3>4.1 Usage data via Google Analytics (only with your consent)</H3>
      <P>
        With your prior consent — and only with your prior consent — the
        Website uses Google Analytics 4 (&ldquo;<B>GA4</B>&rdquo;, property
        G-0Z165PW33N), a web analytics service provided by Google Ireland
        Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Before you
        accept, <B>nothing is measured</B>: no analytics script is
        downloaded, no analytics cookie is set, and no request is sent to
        Google. After you accept, GA4 processes the following categories of
        data to help us understand which pages and features are useful:
      </P>
      <UL>
        <LI>
          pages viewed, session duration, referrer, and outbound link clicks
          (such as clicks on the buy buttons);
        </LI>
        <LI>
          technical attributes of your browser and device: browser type and
          version, operating system, screen resolution, language, device
          model category;
        </LI>
        <LI>
          your <B>approximate</B> location derived from your IP address at
          city or region level. GA4 does not log or store individual IP
          addresses, and IP addresses are never used by us to identify you;
        </LI>
        <LI>
          events such as purchase conversions (value €5.99, currency EUR,
          and the Polar checkout reference used as the transaction
          identifier) and cookie-banner choices.
        </LI>
      </UL>
      <H3>4.2 Data stored on your device (local storage)</H3>
      <Table
        headers={["Item", "Type", "Purpose", "Duration"]}
        rows={[
          [
            "trisle.locale",
            "Local storage entry",
            "Remembers the interface language you selected, so the site opens in it next time.",
            "Until you clear your browser storage",
          ],
          [
            "trisle.consent.v1",
            "Local storage entry",
            "Stores your analytics consent choice and its timestamp, so we do not have to ask again and can honour your decision on every visit.",
            "Until you change or withdraw it",
          ],
          [
            "_ga, _ga_<container>",
            "First-party cookies set by GA4",
            "Distinguish visitors and sessions for aggregate statistics. Set only after you accept analytics.",
            "Up to 2 years (refreshed by subsequent visits)",
          ],
        ]}
      />
      <H3>4.3 Purchase information (processed by Polar)</H3>
      <P>
        Purchases are completed through{" "}
        <A href="https://polar.sh">Polar.sh</A>, which acts as{" "}
        <B>merchant of record</B> for the sale of the App. When you buy the
        App, Polar processes your order, payment, applicable VAT/GST, and
        the confirmation email. We receive from Polar the minimum order data
        needed to deliver the product and handle refunds: the checkout
        reference, the product purchased, the amount, and your receipt
        contact details as included by Polar. We never see or store your
        full payment card details. For information on how Polar processes
        your payment data, see Polar&rsquo;s own privacy policy, available
        on polar.sh.
      </P>
      <H3>4.4 Information you provide voluntarily</H3>
      <P>
        If you contact us for support or feedback, we process whatever you
        choose to include (typically your email address and a description
        of the issue). We use it solely to answer and resolve your request.
      </P>

      <H2 id="purposes">5. Purposes and legal bases (GDPR Art. 6)</H2>
      <Table
        headers={["Purpose", "Data categories", "Legal basis"]}
        rows={[
          [
            "Aggregate, consent-based site analytics (GA4)",
            "Usage data, technical attributes, approximate location",
            "Art. 6(1)(a) GDPR — consent (withdrawable at any time)",
          ],
          [
            "Selling and delivering the App, invoicing, taxes, refunds",
            "Order and payment reference data (via Polar)",
            "Art. 6(1)(b) GDPR — performance of the purchase contract",
          ],
          [
            "Protecting the Website and infrastructure from abuse, and defending legal claims",
            "Technical log attributes held by hosting providers",
            "Art. 6(1)(f) GDPR — legitimate interests, balanced against your rights",
          ],
          [
            "Answering support requests you initiate",
            "What you send us",
            "Art. 6(1)(b)/(f) GDPR — handling your request",
          ],
          [
            "Remembering language and consent choices",
            "Local storage entries listed in section 4.2",
            "Strictly necessary / requested by the user (ePrivacy derogation)",
          ],
        ]}
      />

      <H2 id="analytics-details">6. Google Analytics in detail</H2>
      <UL>
        <LI>
          <B>Consent-gated loading.</B> The Website implements Google
          Consent Mode v2 together with strict prior consent: the GA4
          library is only downloaded after you press &ldquo;Accept&rdquo; in
          the consent banner. If you decline, nothing loads and nothing is
          measured — there are no &ldquo;cookieless pings&rdquo; in the
          background either.
        </LI>
        <LI>
          <B>No cross-site tracking, no advertising use.</B> We use GA4 only
          to evaluate our own Website. We have disabled advertising
          features and do not use GA data to build advertising profiles.
        </LI>
        <LI>
          <B>Retention.</B> Event-level data is retained in the GA4 property
          for a maximum of 14 months, after which Google deletes it
          automatically.
        </LI>
        <LI>
          <B>Data sharing settings.</B> Google processes the data on our
          behalf under the Google Analytics Terms of Service and the EU
          Standard Contractual Clauses incorporated for service providers in
          the EEA. Google is certified under the EU-U.S. Data Privacy
          Framework.
        </LI>
        <LI>
          <B>Your opt-outs.</B> You can withdraw consent at any time via the
          &ldquo;Cookie settings&rdquo; link in the Website footer, or by
          clearing your browser storage. Independently of us, you can
          install Google&rsquo;s official opt-out browser add-on
          (tools.google.com/dlpage/gaoptout) or block analytics in your
          browser settings.
        </LI>
      </UL>

      <H2 id="recipients">7. Recipients and categories of recipients</H2>
      <P>
        We deliberately keep the circle of recipients tiny. Apart from the
        App itself — which sends nothing anywhere — the following processors
        and independent controllers may come into contact with data:
      </P>
      <UL>
        <LI>
          <B>Google Ireland Ltd</B> — GA4 analytics (only after consent);
        </LI>
        <LI>
          <B>Polar.sh</B> (Polar Software, Inc. and its payment providers) —
          checkout, payment, tax and refund handling as merchant of record;
        </LI>
        <LI>
          <B>GitHub, Inc.</B> — static hosting of the Website via GitHub
          Pages; requests are logged by GitHub for security and abuse
          prevention under GitHub&rsquo;s privacy statement;
        </LI>
        <LI>
          public institutions, only where we are legally compelled (court
          order, tax law).
        </LI>
      </UL>
      <P>
        We do not sell personal data, we do not rent it, and we do not use
        it for third-party advertising. There are no data-broker
        relationships of any kind.
      </P>

      <H2 id="transfers">8. International data transfers</H2>
      <P>
        Our providers may process data outside the European Economic Area
        (for example in the United States). Where that happens, transfers
        rely on an adequacy decision of the European Commission — such as
        the EU-U.S. Data Privacy Framework, under which Google and GitHub
        are certified — or, failing that, on the European Commission&rsquo;s
        Standard Contractual Clauses together with technical and
        organisational safeguards. You may request a copy of the relevant
        safeguards using the contact details in section 16.
      </P>

      <H2 id="retention">9. How long we keep data</H2>
      <UL>
        <LI>
          <B>GA4 data:</B> maximum 14 months, then automatically deleted by
          Google;
        </LI>
        <LI>
          <B>Consent record:</B> kept locally in your browser until you
          change it; on our side we do not maintain a central consent
          database, the local timestamped record is the proof of consent;
        </LI>
        <LI>
          <B>Order data:</B> retained by us and Polar for the duration
          required by tax and commercial law (typically 6 to 10 years
          depending on jurisdiction), reduced to the statutory minimum;
        </LI>
        <LI>
          <B>Support conversations:</B> deleted when resolved, unless
          retention is needed to defend legal claims;
        </LI>
        <LI>
          <B>Local storage on your device:</B> until you clear it.
        </LI>
      </UL>

      <H2 id="rights">10. Your rights</H2>
      <P>
        Under the GDPR — and equivalent laws where they apply to you — you
        have the following rights regarding your personal data:
      </P>
      <UL>
        <LI>
          <B>Access</B> (Art. 15) — obtain confirmation and a copy of your
          data;
        </LI>
        <LI>
          <B>Rectification</B> (Art. 16) — correct inaccurate data;
        </LI>
        <LI>
          <B>Erasure</B> (Art. 17) — have your data deleted;
        </LI>
        <LI>
          <B>Restriction</B> (Art. 18) — restrict processing while a dispute
          is resolved;
        </LI>
        <LI>
          <B>Data portability</B> (Art. 20) — receive data you provided in a
          machine-readable format;
        </LI>
        <LI>
          <B>Objection</B> (Art. 21) — object to processing based on
          legitimate interests;
        </LI>
        <LI>
          <B>Withdrawal of consent</B> (Art. 7(3)) — withdraw your analytics
          consent at any time with effect for the future, via the
          &ldquo;Cookie settings&rdquo; footer link or by clearing your
          browser storage;
        </LI>
        <LI>
          <B>Complaint</B> (Art. 77) — lodge a complaint with your local
          supervisory authority, in particular in the EU member state of
          your habitual residence or place of work.
        </LI>
      </UL>
      <P>
        To exercise any right, contact us as described in section 16. We
        respond within one month, as required by law. Where a request
        concerns payment or order data that only Polar holds as merchant of
        record, we will either forward your request or point you to
        Polar&rsquo;s own data-subject request channel.
      </P>

      <H2 id="children">11. Children</H2>
      <P>
        The Website and the App are not directed at children, and we do not
        knowingly collect personal data from children below the age at which
        consent of a holder of parental responsibility is required in your
        country (not below 16 in the EU; 13 where US law applies). If you
        believe a child has provided us with personal data, contact us and
        we will delete it promptly.
      </P>

      <H2 id="security">12. Security measures</H2>
      <P>
        We protect data with measures appropriate to the risk: the Website
        is served exclusively over HTTPS; the App processes data on-device
        so there is no central data store to attack; we collect the minimum
        data necessary; analytics runs without storing IP addresses; and
        payment details never pass through our hands. Where we use
        processors, they are bound by data processing agreements.
      </P>

      <H2 id="dnt">13. Do Not Track and browser signals</H2>
      <P>
        There is currently no industry-consensus response to
        &ldquo;Do Not Track&rdquo; signals. Instead of relying on such
        signals, we treat the choice you make in our consent banner as the
        binding control over analytics: decline once and analytics never
        loads on any of your visits until you change your mind.
      </P>

      <H2 id="changes">14. Changes to this policy</H2>
      <P>
        We may update this policy to reflect changes in the Website, the
        App, the services we use, or the law. The &ldquo;Last
        updated&rdquo; date above always shows the current version. If a
        change is material — in particular any expansion of data collection
        that would require fresh consent — we will ask for your consent
        again through the banner before continuing.
      </P>

      <H2 id="contact">15. Contact</H2>
      <P>
        You can reach the Operator for any privacy matter:
      </P>
      <UL>
        <LI>
          via the support contact stated on your purchase receipt (the
          fastest route for purchase-related questions), or
        </LI>
        <LI>
          by opening an issue at{" "}
          <A href="https://github.com/trisle-app/Trisle_Website/issues">
            github.com/trisle-app/Trisle_Website/issues
          </A>{" "}
          for Website questions.
        </LI>
      </UL>
      <P>
        If we respond to a request about the App, we will never ask you to
        send the content of your notifications — there is no scenario in
        which we need it, because the App never sends it anywhere.
      </P>

      <H2 id="summary">16. Quick summary</H2>
      <Note>
        <UL>
          <LI>
            The App is fully on-device: no accounts, no telemetry, nothing
            uploaded.
          </LI>
          <LI>
            The Website uses Google Analytics only if you explicitly accept;
            decline and nothing is collected at all.
          </LI>
          <LI>
            Payments and receipts are handled by Polar.sh as merchant of
            record; we never see your card details.
          </LI>
          <LI>
            You can withdraw consent anytime via &ldquo;Cookie
            settings&rdquo; in the footer, and you have all GDPR rights via
            the contact channels above.
          </LI>
        </UL>
      </Note>
    </>
  );
}
