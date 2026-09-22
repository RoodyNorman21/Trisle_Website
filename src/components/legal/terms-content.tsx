import {
  A,
  B,
  H2,
  LI,
  Note,
  P,
  Table,
  UL,
} from "@/components/legal/legal-ui";

/**
 * Terms & Conditions content (governing English version).
 * Facts locked to the product reality: €5.99 one-time purchase via
 * Polar.sh (merchant of record), 7-day refund promise, on-device app,
 * two standard Android permissions.
 */

export function TermsContent() {
  return (
    <>
      <H2 id="agreement">1. Agreement and scope</H2>
      <P>
        These Terms and Conditions (&ldquo;<B>Terms</B>&rdquo;) form a
        binding agreement between you and the operator of Trisle
        (&ldquo;<B>Operator</B>&rdquo;, &ldquo;<B>we</B>&rdquo;,
        &ldquo;<B>us</B>&rdquo;) governing your use of:
      </P>
      <UL>
        <LI>
          the Trisle Website at trisle-app.github.io/Trisle_Website
          (&ldquo;<B>Website</B>&rdquo;), including its content, marketing
          materials and purchase flow; and
        </LI>
        <LI>
          the Trisle application for Android (&ldquo;<B>App</B>&rdquo;),
          which you license from us as described in section 5.
        </LI>
      </UL>
      <P>
        By using the Website, purchasing the App, or installing or using the
        App, you accept these Terms. If you do not accept them, do not use
        the Website or the App. The Privacy Policy
        (trisle-app.github.io/Trisle_Website/privacy) is incorporated into
        these Terms by reference and describes how we handle data.
      </P>

      <H2 id="definitions">2. Definitions</H2>
      <UL>
        <LI>
          <B>&ldquo;Device&rdquo;</B> — an Android phone or tablet that you
          own or control.
        </LI>
        <LI>
          <B>&ldquo;Polar&rdquo;</B> — Polar.sh, the merchant of record that
          processes checkout, payment, taxes and refunds for the App.
        </LI>
        <LI>
          <B>&ldquo;Checkout reference&rdquo;</B> — the unique identifier
          Polar attaches to your order (visible in your receipt and in the
          confirmation URL), used to retrieve your purchase and to process
          refunds.
        </LI>
      </UL>

      <H2 id="eligibility">3. Who may use the App</H2>
      <P>
        You must be at least the age at which you can enter into binding
        contracts in your country (in the EU generally 18, in some cases 16
        with parental consent) or have the consent of a parent or legal
        guardian. You may use the App only on Devices that you own or
        control, and only in compliance with all laws applicable to you.
      </P>

      <H2 id="website-use">4. Use of the Website</H2>
      <P>
        The Website is provided for information about the App and for
        purchasing it. You agree not to:
      </P>
      <UL>
        <LI>
          interfere with, overload, or attempt to gain unauthorised access
          to the Website or related systems;
        </LI>
        <LI>
          scrape, copy, or republish substantial parts of the Website&rsquo;s
          content without our prior written permission (short quotations
          with a link are fine);
        </LI>
        <LI>
          use the Website to distribute unlawful, infringing, or harmful
          content, or for any fraudulent purpose;
        </LI>
        <LI>
          circumvent or attempt to circumvent any security or access
          control.
        </LI>
      </UL>

      <H2 id="license">5. License grant</H2>
      <P>
        The App is licensed, not sold. Subject to your continued compliance
        with these Terms and your completion of payment, we grant you a
        personal, worldwide, non-exclusive, non-transferable,
        non-sublicensable and <B>perpetual</B> license to install and use
        the App on Devices that you own or control, for your private use.
        Because the App is a one-time purchase, the license does not expire
        and there is no subscription: one payment, yours forever.
      </P>
      <Note>
        Proof of purchase travels with your Polar receipt and the checkout
        reference in your confirmation link. Keep the receipt email — it is
        the key to re-retrieving your purchase and to refunds.
      </Note>

      <H2 id="restrictions">6. License restrictions</H2>
      <P>You may not, and may not allow others to:</P>
      <UL>
        <LI>
          redistribute, resell, rent, lease, lend or sublicense the App or
          access to it, whether for money or free of charge;
        </LI>
        <LI>
          publish the App or its installable files on other stores,
          file-sharing services, or repositories;
        </LI>
        <LI>
          modify, reverse engineer or decompile the App except to the
          extent that applicable law expressly permits it despite this
          limitation;
        </LI>
        <LI>
          remove, obscure or alter any proprietary notice in the App;
        </LI>
        <LI>
          use the App to build a competing product, or in any unlawful way.
        </LI>
      </UL>
      <P>
        Where the law of your country gives you mandatory rights that these
        restrictions would otherwise limit (for example rights of
        decompilation for interoperability), those rights prevail.
      </P>

      <H2 id="purchase">7. Purchase, price and payment</H2>
      <P>
        The App is offered for a one-time price of <B>€5.99</B>. Checkout is
        operated by Polar as <B>merchant of record</B>: Polar collects the
        payment, handles applicable VAT/GST and other indirect taxes,
        issues the receipt, and processes refunds. We never receive or
        store your full payment instrument details. The displayed price
        includes applicable taxes where required by law; your final price
        is shown on the checkout page before you pay. We may change the
        price at any time, but the change never affects an order that has
        already been completed.
      </P>

      <H2 id="delivery">8. Delivery and retrieving your purchase</H2>
      <P>
        The App is digital content delivered immediately after payment:
        your confirmation page (the &ldquo;success&rdquo; page, reachable
        through the checkout flow and identifiable by your checkout
        reference) and your Polar receipt email contain everything needed to
        download and activate the App. If you lose access, the receipt
        email and your checkout reference are sufficient to retrieve your
        purchase at any time — no account is required.
      </P>

      <H2 id="refunds">9. Statutory withdrawal right and our refund policy</H2>
      <P>
        <B>EU/UK consumers:</B> for digital content not supplied on a
        tangible medium, you have a statutory 14-day right of withdrawal.
        When you purchase, you expressly consent to immediate performance
        of the contract and acknowledge that, once delivery of the digital
        content begins, you lose your statutory right of withdrawal. To
        make this transparent, the checkout presents this acknowledgment
        before payment.
      </P>
      <P>
        <B>Our voluntary promise on top:</B> independent of the above and
        more generous than many statutory regimes, we refund any purchase
        in full if you tell us within <B>7 days of purchase</B> that the
        App does not work for you. Contact the support channel stated on
        your Polar receipt with your checkout reference; Polar processes
        the refund to your original payment method. We may refuse refunds
        that are abusive (for example repeated purchase-refund cycles), but
        you always keep the statutory rights described above.
      </P>
      <Table
        headers={["Situation", "Your remedy"]}
        rows={[
          [
            "Changed your mind within 7 days of purchase",
            "Full refund via the support channel on your Polar receipt",
          ],
          [
            "App does not work on your Device",
            "Full refund within 7 days; also contact support — we can often fix device-specific issues in updates",
          ],
          [
            "Accidental double purchase",
            "Full refund of the duplicate — contact support with both references",
          ],
        ]}
      />

      <H2 id="functionality">10. Functionality, permissions and device compatibility</H2>
      <P>
        The App reproduces the iPhone&rsquo;s Dynamic Island experience on
        Android. To work, it requires the standard Android permissions
        described in our Privacy Policy (notification listener access and
        &ldquo;display over other apps&rdquo;), which you grant and can
        revoke in Android settings. Revoking them disables the related
        features. You acknowledge that:
      </P>
      <UL>
        <LI>
          Android device manufacturers ship different system skins and
          battery optimisation strategies; aggressive battery savers or
          task killers may limit background behaviour, and the App&rsquo;s
          documentation explains how to exclude it;
        </LI>
        <LI>
          functionality may vary between Devices, Android versions, and
          manufacturer restrictions, and we do not warrant that every
          feature will work identically on every Device;
        </LI>
        <LI>
          major OS updates may temporarily require an App update, which we
          will supply through the distribution channel used for your
          purchase;
        </LI>
        <LI>
          the App is a productivity/customisation tool; it is not a medical
          or safety device, and notification delivery may be delayed or
          suppressed by the operating system or by other apps.
        </LI>
      </UL>

      <H2 id="updates">11. Updates and changes</H2>
      <P>
        We may release updates, patches and new versions of the App and may
        add, change or remove features over time. Updates for the App are
        distributed through the channel used for your purchase. If we make
        material changes to these Terms, we will publish the new version on
        this page with a new &ldquo;Last updated&rdquo; date and, where the
        change is significant, announce it on the Website. Your continued
        use of the App or Website after a change takes effect constitutes
        acceptance; if you do not agree with a change, your remedy is to
        stop using the Website and to uninstall the App.
      </P>

      <H2 id="ip">12. Intellectual property and trademarks</H2>
      <P>
        The App and the Website, including their design, code, text,
        graphics and the Trisle name, are protected by copyright and other
        rights and remain the exclusive property of the Operator. Nothing
        in these Terms transfers ownership of anything to you.
      </P>
      <Note>
        Apple, iPhone, iOS, Dynamic Island, Android and Google are
        trademarks of Apple Inc. and Google LLC respectively. Trisle is an
        independent product and is not affiliated with, endorsed by, or
        sponsored by any of these companies. References to their products
        are descriptive only.
      </Note>

      <H2 id="third-party">13. Third-party services and links</H2>
      <P>
        The Website and purchase flow rely on independent third parties:
        Polar for checkout, payment, taxes and refunds; Google Analytics
        (only if you consented — see the Privacy Policy) for aggregate
        statistics; and GitHub Pages for hosting. Those services are
        governed by their own terms and privacy policies, and we are not
        responsible for their content or behaviour. Links to third-party
        sites are provided for convenience and do not imply endorsement.
      </P>

      <H2 id="warranty">14. Disclaimer of warranties</H2>
      <P>
        The Website and the App are provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo; without warranties of any kind, whether
        express or implied, to the maximum extent permitted by law —
        including implied warranties of merchantability, fitness for a
        particular purpose and non-infringement. We do not warrant that the
        Website will be uninterrupted or error-free.
      </P>
      <P>
        <B>This does not affect mandatory statutory rights.</B> If you are
        a consumer in the EU, the UK, or another jurisdiction with mandatory
        consumer protection, you keep the statutory rights that cannot be
        excluded, including your rights in respect of non-conforming
        digital content under the EU Digital Content Directive
        (2019/770/EU): the App must be conform to the contract, be updated
        as necessary, and be supported for the period required by law.
      </P>

      <H2 id="liability">15. Limitation of liability</H2>
      <P>
        To the maximum extent permitted by law, our aggregate liability
        arising out of or in connection with the App or the Website is
        limited to the amount you actually paid for the App (€5.99).
      </P>
      <P>
        Nothing in these Terms excludes or limits liability that cannot be
        excluded under applicable law, including: liability for intent or
        gross negligence; liability for death, personal injury, or damage
        to health caused by negligence; liability under mandatory product
        liability law; and, where you are a consumer, liability for damages
        from injury to life, body or health and for breaches of material
        contractual duties (cardinal obligations) caused by simple
        negligence — in the latter case limited to the foreseeable damage
        typical for this type of contract.
      </P>

      <H2 id="indemnity">16. Indemnification</H2>
      <P>
        You agree to indemnify and hold us harmless from claims, damages
        and reasonable legal costs arising from your breach of these Terms
        or your unlawful use of the App or Website, provided that you are
        responsible for the breach. This does not apply where you are not
        at fault, and it does not limit any mandatory statutory rights you
        have as a consumer.
      </P>

      <H2 id="termination">17. Term and termination</H2>
      <P>
        These Terms and the license remain in effect until terminated. The
        license terminates automatically and immediately if you breach the
        restrictions in section 6. You may terminate at any time by
        uninstalling the App. Upon termination you must stop using and
        delete all copies of the App. Sections 12 (intellectual property),
        14 (warranty disclaimer), 15 (liability), 16 (indemnification) and
        19 (miscellaneous) survive termination. Termination does not affect
        your refund rights under section 9.
      </P>

      <H2 id="law">18. Governing law and jurisdiction</H2>
      <P>
        These Terms are governed by the laws of the country in which the
        Operator has its principal place of business, excluding its
        conflict-of-laws rules and the United Nations Convention on
        Contracts for the International Sale of Goods.
      </P>
      <P>
        <B>Consumer protection.</B> If you are a consumer and the law of
        your country of residence grants you mandatory protective
        provisions (including the consumer jurisdiction of your local
        courts) that cannot be waived, you keep the benefit of those
        provisions and forums, and nothing in these Terms deprives you of
        them. Mandatory consumer rights under EU law — including the rules
        of Regulation (Rome I) on applicable law for consumer contracts —
        always prevail over this choice of law.
      </P>

      <H2 id="misc">19. Miscellaneous</H2>
      <UL>
        <LI>
          <B>Severability.</B> If any provision is held invalid, the rest of
          the Terms stays in force and the invalid provision is replaced by
          a valid one that comes closest to its economic purpose.
        </LI>
        <LI>
          <B>No waiver.</B> Our failure to enforce a provision is not a
          waiver of it.
        </LI>
        <LI>
          <B>Assignment.</B> You may not transfer this agreement; we may
          transfer it in connection with a merger, acquisition or sale of
          assets, with notice to you and without reducing your rights.
        </LI>
        <LI>
          <B>Entire agreement.</B> These Terms (with the incorporated
          Privacy Policy) are the entire agreement between you and us
          regarding the App and Website.
        </LI>
        <LI>
          <B>Language.</B> These Terms are concluded in English; any
          translation is for convenience only and the English version
          governs.
        </LI>
      </UL>

      <H2 id="changes-terms">20. Changes to these Terms</H2>
      <P>
        We may amend these Terms prospectively at any time. The version
        published on this page at the time of your purchase or use applies.
        Where an amendment materially reduces your rights, we will not
        apply it retroactively to purchases already made, and — where
        required by law — we will seek your explicit agreement before it
        applies to you.
      </P>

      <H2 id="contact-terms">21. Contact</H2>
      <P>
        Questions about these Terms, refund requests, or support matters:
        use the support contact stated on your Polar receipt (fastest for
        purchase-related issues), or open an issue at{" "}
        <A href="https://github.com/trisle-app/Trisle_Website/issues">
          github.com/trisle-app/Trisle_Website/issues
        </A>
        .
      </P>
    </>
  );
}
