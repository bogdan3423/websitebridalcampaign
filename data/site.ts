// ÎNLOCUIȚI AICI numele provizoriu, logo-ul și datele de contact.
export const site = {
  name: "impactomedia.ro",
  logo: "", // Exemplu: /images/logo.svg. Fără fișier, afișăm numele tipografic.
  whatsapp: "40748030566", // Număr internațional, numai cifre: 407xxxxxxxx
  phoneDisplay: "+40 748 030 566",
  instagram: "", // URL complet
  email: "",
  formEndpoint: "", // Endpoint HTTPS care acceptă POST JSON. Lăsați gol pentru WhatsApp / email.
  url: "https://bridal-growth-cluj.rusbogdan3423.chatgpt.site",
};
export function whatsappUrl(
  message = "Bună! Aș vrea să discutăm despre promovarea salonului meu.",
) {
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : "#contact";
}
export const navigation = [
  ["Servicii", "#servicii"],
  ["Video", "#video"],
  ["Galerie", "#galerie"],
  ["Cum lucrăm", "#proces"],
] as const;
