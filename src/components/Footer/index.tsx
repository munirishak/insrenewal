"use client";

import { Footer } from "flowbite-react";

export default function MyFooter() {
  return (
    <Footer container className="fixed bottom-0 rounded-none">
      <Footer.Copyright
        by="Munir Ishak"
        href="#"
        year={new Date().getFullYear()}
      />
    </Footer>
  );
}
