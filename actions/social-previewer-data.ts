"use server";

import axios from "axios";
import cheerio from "cheerio";

export const socialPreviewerData = async (url: string | string[]) => {
  if (!url || !url.includes(".")) {
    return {
      error: "Please enter a valid url",
    };
  }

  const finalURL = `https://${url}`;
  const urlObject = new URL(finalURL);
  const domain = urlObject.hostname;

  const response = await axios.get(finalURL + "?t=" + new Date().getTime(), {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      "Content-Type": "javascript/text",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    },
  });

  if (!response || !response.data) {
    return {
      error: "Please enter a valid url",
    };
  }

  const $ = cheerio.load(response.data);
  if (!$ || !$("title").text()) {
    return {
      error: "Please enter a valid url",
    };
  }

  let reportStats = {
    facebook: 0,
    facebookWarning: 0,
    twitter: 0,
    twitterWarning: 0,
    searchEngine: 0,
    searchEngineWarning: 0,
    favicon: 0,
    faviconWarning: 0,
    server: 0,
    serverWarning: 0,
  };

  const titles = $("head > title");
  let titleTexts = [];
  if (titles.length > 1) {
    reportStats.searchEngineWarning++;

    titleTexts = titles
      .map(function () {
        return $(this).text();
      })
      .get();
  } else {
    titleTexts = [titles.text()];
  }
  const title = $("head > title").text();
  const metaTitle = $('meta[name="title"]').attr("content");
  const metaDescription = $('meta[name="description"]').attr("content");

  let ogImage =
    $('meta[property="og:image"]').attr("content") ||
    $('meta[name="og:image"]').attr("content");
  const ogTitle =
    $('meta[property="og:title"]').attr("content") ||
    $('meta[name="og:title"]').attr("content");
  const ogDescription =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[name="og:description"]').attr("content");
  const ogUrl =
    $('meta[property="og:url"]').attr("content") ||
    $('meta[name="og:url"]').attr("content");
  const ogType =
    $('meta[property="og:type"]').attr("content") ||
    $('meta[name="og:type"]').attr("content");
  const ogImageAlt =
    $('meta[property="og:image:alt"]').attr("content") ||
    $('meta[name="og:image:alt"]').attr("content");
  const ogImageWidth =
    $('meta[property="og:image:width"]').attr("content") ||
    $('meta[name="og:image:width"]').attr("content");
  const ogImageHeight =
    $('meta[property="og:image:height"]').attr("content") ||
    $('meta[name="og:image:height"]').attr("content");
  const ogImageType =
    $('meta[property="og:image:type"]').attr("content") ||
    $('meta[name="og:image:type"]').attr("content");
  const ogImageSecureUrl =
    $('meta[property="og:image:secure_url"]').attr("content") ||
    $('meta[name="og:image:secure_url"]').attr("content");

  const twitterCard =
    $('meta[property="twitter:card"]').attr("content") ||
    $('meta[name="twitter:card"]').attr("content");
  const twitterSite =
    $('meta[property="twitter:site"]').attr("content") ||
    $('meta[name="twitter:site"]').attr("content");
  const twitterTitle =
    $('meta[property="twitter:title"]').attr("content") ||
    $('meta[name="twitter:title"]').attr("content");
  const twitterDescription =
    $('meta[property="twitter:description"]').attr("content") ||
    $('meta[name="twitter:description"]').attr("content");
  let twitterImage =
    $('meta[property="twitter:image"]').attr("content") ||
    $('meta[name="twitter:image"]').attr("content");
  const twitterImageAlt =
    $('meta[property="twitter:image:alt"]').attr("content") ||
    $('meta[name="twitter:image:alt"]').attr("content");
  const twitterCreator =
    $('meta[property="twitter:creator"]').attr("content") ||
    $('meta[name="twitter:creator"]').attr("content");
  const twitterUrl =
    $('meta[property="twitter:url"]').attr("content") ||
    $('meta[name="twitter:url"]').attr("content");

  const canonicalLink = $('link[rel="canonical"]').attr("href");
  const keywords = $('meta[name="keywords"]').attr("content");

  const serverDetails = response.headers["server"];
  const date = response.headers["date"];
  const lastModified = response.headers["last-modified"];
  const xPoweredBy = response.headers["x-powered-by"];

  const robotsContent = $('meta[name="robots"]').attr("content");
  const isIndexable = !robotsContent || !robotsContent.includes("noindex"); //true if noindex is not present so page is indexable

  const h1Tags = $("h1");
  const h1Content = h1Tags
    .map((i: any, el: any) => $(el).text().trim())
    .get()
    .filter((text: any) => text.length > 0);
  const hasMultipleH1 = h1Content.length;

  let favicon =
    $('link[rel="icon"]').attr("href") ||
    $('link[rel="shortcut icon"]').attr("href") ||
    $('link[rel="favicon"]').attr("href");
  const faviconType = $('link[rel="icon"]').attr("type");
  const faviconSizes = $('link[rel="icon"]').attr("sizes");
  let appleTouchIcon = $('link[rel="apple-touch-icon"]').attr("href");
  const appleTouchIconSizes = $('link[rel="apple-touch-icon"]').attr("sizes");
  const androidManifest = $('link[rel="manifest"]').attr("href");
  let msApplicationTileImage = $('meta[name="msapplication-TileImage"]').attr(
    "content"
  );

  //calculate reportStats for facebook
  if (!ogImage) {
    reportStats.facebook++;
  }
  if (!ogTitle) {
    reportStats.facebook++;
  }
  if (!ogDescription) {
    reportStats.facebook++;
  }
  if (!ogUrl) {
    reportStats.facebook++;
  }
  if (!ogType) {
    reportStats.facebook++;
  }

  //calculate reportStats for twitter
  if (!twitterCard) {
    reportStats.twitter++;
  }
  if (!twitterUrl) {
    reportStats.twitter++;
  }
  if (!twitterTitle) {
    reportStats.twitter++;
  }
  if (!twitterDescription) {
    reportStats.twitter++;
  }
  if (!twitterImage) {
    reportStats.twitter++;
  }

  //calculate reportStats for search engine
  if (!title) {
    reportStats.searchEngine++;
  }
  if (!metaDescription) {
    reportStats.searchEngine++;
  }
  if (!canonicalLink) {
    reportStats.searchEngineWarning++;
  }
  if (!isIndexable) {
    reportStats.searchEngineWarning++;
  }
  if (h1Tags.length !== 1) {
    reportStats.searchEngineWarning++;
  }

  //calculate reportStats for favicon
  if (!favicon) {
    reportStats.favicon++;
  }
  if (!appleTouchIcon) {
    reportStats.favicon++;
  }
  if (!androidManifest) {
    reportStats.favicon++;
  }
  if (!msApplicationTileImage) {
    reportStats.favicon++;
  }

  //calculate suggestions by reportStats.
  let suggestionsNumber = Object.values(reportStats).reduce((a, b) => a + b, 0);

  let previewerImage = ogImage || twitterImage;
  let previewerFavicon = favicon || appleTouchIcon || msApplicationTileImage;
  let previewerTitle = ogTitle || twitterTitle || metaTitle || title;
  let previewerDescription =
    ogDescription || twitterDescription || metaDescription;

  function modifyUrl(url: string | undefined, domain: string): string {
    if (!url) {
      return "";
    }

    if (url.startsWith("http")) {
      return url;
    }

    if (url.startsWith("www.")) {
      return `https://${url}`;
    }

    if (url.startsWith("//")) {
      return `https:${url}`;
    }

    if (url.startsWith("/")) {
      return `https://${domain}${url}`;
    }

    return `https://${domain}/${url}`;
  }

  previewerFavicon = modifyUrl(previewerFavicon, domain);
  previewerImage = modifyUrl(previewerImage, domain);

  return {
    previewerImage,
    previewerFavicon,
    previewerTitle,
    previewerDescription,
    suggestionsNumber,
    reportStats,
    title,
    titleTexts,
    metaTitle,
    metaDescription,
    ogImage,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImageAlt,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
    ogImageSecureUrl,
    twitterCard,
    twitterSite,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterImageAlt,
    twitterCreator,
    twitterUrl,
    canonicalLink,
    keywords,
    serverDetails,
    date,
    lastModified,
    xPoweredBy,
    robotsContent,
    isIndexable,
    h1Content,
    hasMultipleH1,
    favicon,
    faviconType,
    faviconSizes,
    appleTouchIcon,
    appleTouchIconSizes,
    androidManifest,
    msApplicationTileImage,
    domain,
    url,
  };
};
