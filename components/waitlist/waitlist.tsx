"use client"

import { Container, Flex, Button, Input } from "@chakra-ui/react"
import { Section } from "components/section"
import type React from "react"
import { useState } from "react"

const Waitlist: React.FC = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new URLSearchParams()
    formData.append("entry.1115472667", email)

    try {
      await fetch(
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeBOfXMilwtbDavfuqd1GmTTbTXuklbx8-i5BSW_aYzPfMRYA/formResponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        },
      )
      alert("Thank you for signing up!")
    } catch (error) {
      alert("Thank you for signing up!")
    }
  }

  return (
    <Section id="waitlist" className="flex justify-center items-center py-12">
      <Container maxW="100%" px="8" py="10" className="flex justify-center items-center">
        <Flex
          width="full"
          maxWidth="md"
          align="center"
          justifyContent="center"
          direction="column"
          className="border border-gray-300 rounded-lg p-8 shadow-md bg-white"
        >
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="text-center">
              <p className="text-2xl mb-2">✨</p>
              <p className="text-lg font-medium">
                Join the waitlist to get early access to <strong className="font-bold">KalKram</strong>!
              </p>
            </div>
            <Input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 placeholder-gray-400 bg-white text-gray-900 text-sm font-medium transition-all duration-200 ease-in-out"
            />
            <Button
              colorScheme="primary"
              size="lg"
              type="submit"
              className="w-full px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg transition-colors duration-200 border-2 border-pink-700 hover:border-pink-800"
            >
              Join Waitlist
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 ml-2 inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </form>
        </Flex>
      </Container>
    </Section>
  )
}

export default Waitlist

